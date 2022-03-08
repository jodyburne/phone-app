import { Flex, Icon, SpinnerOutlined } from "@aircall/tractor";

const LoadingSpinner: React.VFC<{ isLoading: boolean }> = ({ isLoading }) => (
  <Flex height="100vh" alignItems="center">
    {isLoading && (
      <Icon
        data-testid="spinner"
        size="128px"
        color="primary.base"
        component={SpinnerOutlined}
        spin={isLoading}
      />
    )}
  </Flex>
);

export default LoadingSpinner;
