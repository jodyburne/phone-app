import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddNoteInput = {
  activityId: Scalars['ID'];
  content: Scalars['String'];
};

export type AuthResponseType = {
  __typename?: 'AuthResponseType';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
  user: UserType;
};

export type Call = {
  __typename?: 'Call';
  call_type: Scalars['String'];
  created_at: Scalars['String'];
  direction: Scalars['String'];
  duration: Scalars['Float'];
  from: Scalars['String'];
  id: Scalars['ID'];
  is_archived: Scalars['Boolean'];
  notes: Array<Note>;
  to: Scalars['String'];
  via: Scalars['String'];
};

export type DeprecatedAuthResponseType = {
  __typename?: 'DeprecatedAuthResponseType';
  access_token: Scalars['String'];
  user: UserType;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote: Call;
  archiveCall: Call;
  login: AuthResponseType;
  /** @deprecated This has been deprecated, please use the refreshTokenV2 mutation */
  refreshToken: DeprecatedAuthResponseType;
  refreshTokenV2: AuthResponseType;
};


export type MutationAddNoteArgs = {
  input: AddNoteInput;
};


export type MutationArchiveCallArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type PaginatedCalls = {
  __typename?: 'PaginatedCalls';
  hasNextPage: Scalars['Boolean'];
  nodes?: Maybe<Array<Call>>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  call?: Maybe<Call>;
  me: UserType;
  paginatedCalls: PaginatedCalls;
};


export type QueryCallArgs = {
  id: Scalars['ID'];
};


export type QueryPaginatedCallsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onUpdatedCall?: Maybe<Call>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type ArchiveCallMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveCallMutation = { __typename?: 'Mutation', archiveCall: { __typename?: 'Call', id: string, direction: string, from: string, to: string, duration: number, via: string, is_archived: boolean, call_type: string, created_at: string, notes: Array<{ __typename?: 'Note', id: string, content: string }> } };

export type GetCallQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCallQuery = { __typename?: 'Query', call?: { __typename?: 'Call', id: string, direction: string, from: string, to: string, duration: number, via: string, is_archived: boolean, call_type: string, created_at: string, notes: Array<{ __typename?: 'Note', id: string, content: string }> } | null };

export type ListCallsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type ListCallsQuery = { __typename?: 'Query', paginatedCalls: { __typename?: 'PaginatedCalls', totalCount: number, hasNextPage: boolean, nodes?: Array<{ __typename?: 'Call', id: string, direction: string, from: string, to: string, duration: number, via: string, is_archived: boolean, call_type: string, created_at: string, notes: Array<{ __typename?: 'Note', id: string, content: string }> }> | null } };

export type LoginMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponseType', access_token: string, refresh_token: string, user: { __typename?: 'UserType', id: string, username: string } } };


export const ArchiveCallDocument = gql`
    mutation ArchiveCall($id: ID!) {
  archiveCall(id: $id) {
    id
    direction
    from
    to
    duration
    via
    is_archived
    call_type
    created_at
    notes {
      id
      content
    }
  }
}
    `;
export type ArchiveCallMutationFn = Apollo.MutationFunction<ArchiveCallMutation, ArchiveCallMutationVariables>;

/**
 * __useArchiveCallMutation__
 *
 * To run a mutation, you first call `useArchiveCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCallMutation, { data, loading, error }] = useArchiveCallMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveCallMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveCallMutation, ArchiveCallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveCallMutation, ArchiveCallMutationVariables>(ArchiveCallDocument, options);
      }
export type ArchiveCallMutationHookResult = ReturnType<typeof useArchiveCallMutation>;
export type ArchiveCallMutationResult = Apollo.MutationResult<ArchiveCallMutation>;
export type ArchiveCallMutationOptions = Apollo.BaseMutationOptions<ArchiveCallMutation, ArchiveCallMutationVariables>;
export const GetCallDocument = gql`
    query GetCall($id: ID!) {
  call(id: $id) {
    id
    direction
    from
    to
    duration
    via
    is_archived
    call_type
    created_at
    notes {
      id
      content
    }
  }
}
    `;

/**
 * __useGetCallQuery__
 *
 * To run a query within a React component, call `useGetCallQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCallQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCallQuery(baseOptions: Apollo.QueryHookOptions<GetCallQuery, GetCallQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCallQuery, GetCallQueryVariables>(GetCallDocument, options);
      }
export function useGetCallLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCallQuery, GetCallQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCallQuery, GetCallQueryVariables>(GetCallDocument, options);
        }
export type GetCallQueryHookResult = ReturnType<typeof useGetCallQuery>;
export type GetCallLazyQueryHookResult = ReturnType<typeof useGetCallLazyQuery>;
export type GetCallQueryResult = Apollo.QueryResult<GetCallQuery, GetCallQueryVariables>;
export const ListCallsDocument = gql`
    query ListCalls($offset: Float, $limit: Float) {
  paginatedCalls(offset: $offset, limit: $limit) {
    nodes {
      id
      direction
      from
      to
      duration
      via
      is_archived
      call_type
      created_at
      notes {
        id
        content
      }
    }
    totalCount
    hasNextPage
  }
}
    `;

/**
 * __useListCallsQuery__
 *
 * To run a query within a React component, call `useListCallsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCallsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCallsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListCallsQuery(baseOptions?: Apollo.QueryHookOptions<ListCallsQuery, ListCallsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCallsQuery, ListCallsQueryVariables>(ListCallsDocument, options);
      }
export function useListCallsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCallsQuery, ListCallsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCallsQuery, ListCallsQueryVariables>(ListCallsDocument, options);
        }
export type ListCallsQueryHookResult = ReturnType<typeof useListCallsQuery>;
export type ListCallsLazyQueryHookResult = ReturnType<typeof useListCallsLazyQuery>;
export type ListCallsQueryResult = Apollo.QueryResult<ListCallsQuery, ListCallsQueryVariables>;
export const LoginDocument = gql`
    mutation Login {
  login(input: {username: "Salvador Sobral", password: "helloo"}) {
    access_token
    refresh_token
    user {
      id
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;