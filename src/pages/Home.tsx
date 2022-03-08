import { useLoginMutation } from "../graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Flex, Icon, SpinnerOutlined } from "@aircall/tractor";

function Home() {
  const navigate = useNavigate();
  const [login, { data, loading, error }] = useLoginMutation({});

  useEffect(() => {
    login();
  }, [login]);

  const handleAuth = () => {
    const tokens = data?.login;
    if (tokens) {
      localStorage.setItem("token", tokens.access_token);
      localStorage.setItem("refreshToken", tokens.refresh_token);
      navigate("/calls");
      return;
    }
    login();
  };

  if (error) {
    localStorage.setItem("token", "");
    localStorage.setItem("refreshToken", "");
    login();
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      {loading && (
        <Button readOnly>
          <Icon component={SpinnerOutlined} spin /> Loading
        </Button>
      )}
      {data && <Button onClick={() => handleAuth()}>See calls</Button>}
    </Flex>
  );
}

export default Home;
