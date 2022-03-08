import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
import jwt_decode, { JwtPayload } from "jwt-decode";

const shouldRefresh = (token?: string | null) => {
  if (token) {
    const decoded = jwt_decode<JwtPayload>(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) return true;
  }
};

export let client: ApolloClient<NormalizedCacheObject>;

const refreshAuthToken = async () => {
  return await client
    .mutate({
      mutation: gql`
        mutation refreshToken {
          refreshTokenV2 {
            access_token
            refresh_token
          }
        }
      `,
    })
    .then((res) => {
      const newTokens = res.data?.refreshTokenV2;
      localStorage.setItem("token", newTokens?.access_token);
      localStorage.setItem("refreshToken", newTokens?.refresh_token);
      return newTokens.access_token;
    });
};

const httpLink = createHttpLink({
  uri: "https://frontend-test-api.aircall.io/graphql",
});

const authLink = setContext(async (req, { headers = {} }) => {
  if (req.operationName === "refreshToken") {
    let refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${refreshToken}`,
        },
      };
    }
    return { headers };
  }

  let token = localStorage.getItem("token");
  const tokenState = shouldRefresh(token);
  if (token && tokenState) {
    const refreshPromise = refreshAuthToken();
    token = await refreshPromise;
  }

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  } else {
    return { headers };
  }
});

client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const Provider: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
