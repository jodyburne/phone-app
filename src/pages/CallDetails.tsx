import { useParams, Link } from "react-router-dom";
import { useGetCallQuery } from "../graphql/generated/graphql";
import { useArchiveCallMutation } from "../graphql/generated/graphql";
import {
  Grid,
  Flex,
  Icon,
  SpinnerOutlined,
  Button,
  Box,
  Typography,
  Spacer,
  ArchiveOutlined,
} from "@aircall/tractor";
import { format, formatDistanceStrict } from "date-fns";
import CallIcon from "../components/CallIcon";
import LoadingSpinner from "../components/LoadingSpinner";

const SubHeading: React.FC = ({ children }) => (
  <Typography color="grey.dark" variant="subheading2">
    {children}
  </Typography>
);

const DataText: React.FC = ({ children }) => (
  <Typography color="primary.dark" variant="subheading">
    {children}
  </Typography>
);

const CallDetails: React.VFC = () => {
  const { id } = useParams();

  const { data, loading, error, refetch } = useGetCallQuery({
    variables: { id: id || "" },
  });
  const [archiveCall, { loading: archivedLoading }] = useArchiveCallMutation({
    variables: {
      id: id || "",
    },
    onCompleted: () => refetch(),
  });

  return (
    <Flex
      bg="grey.lighter"
      p={20}
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      {loading && <LoadingSpinner isLoading={loading} />}

      {(error || data?.call === null) && (
        <Flex
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Button size="small" onClick={() => refetch()}>
            Try again
          </Button>
          <Link to="/">Return</Link>
        </Flex>
      )}

      {data?.call && (
        <Spacer py={40} space="xl" direction="vertical">
          <Typography
            textAlign="center"
            color="primary.base"
            variant="displayM"
          >
            Call Details
          </Typography>
          <Grid
            p={20}
            borderRadius={8}
            boxShadow={1}
            gridRowGap={10}
            gridTemplateColumns="1fr 1fr"
          >
            <SubHeading>Date:</SubHeading>
            <DataText>
              {format(new Date(data?.call?.created_at), "PP")}
            </DataText>
            <SubHeading>Time:</SubHeading>
            <DataText>{format(new Date(data?.call?.created_at), "p")}</DataText>
            <SubHeading>Status: </SubHeading>
            <Button
              style={{ textTransform: "capitalize" }}
              disabled
              size="xSmall"
              mode="outline"
            >
              <CallIcon callType={data?.call?.call_type} size="16px" />
              {data?.call?.call_type}
            </Button>
          </Grid>
          <Grid
            p={20}
            borderRadius={8}
            boxShadow={1}
            gridRowGap={10}
            gridTemplateColumns="1fr 1fr"
          >
            <SubHeading>To:</SubHeading>
            <DataText>{data?.call?.to}</DataText>
            <SubHeading>From:</SubHeading>
            <DataText>{data?.call?.from}</DataText>
            <SubHeading>Duration:</SubHeading>
            <DataText>
              {formatDistanceStrict(0, Number(data?.call?.duration))}
            </DataText>
          </Grid>
          <Box p={20} borderRadius={8} boxShadow={1}>
            <Spacer direction="vertical" space="s">
              <DataText>Actions</DataText>
              {data?.call?.is_archived ? (
                <Button size="xSmall" mode="outline" disabled>
                  <Icon size="16px" component={ArchiveOutlined} />
                  Archived
                </Button>
              ) : (
                <Button
                  size="xSmall"
                  mode="outline"
                  onClick={() => archiveCall()}
                >
                  <Icon
                    size="16px"
                    component={
                      loading || archivedLoading
                        ? SpinnerOutlined
                        : ArchiveOutlined
                    }
                    spin={loading || archivedLoading}
                  />
                  Archive
                </Button>
              )}
            </Spacer>
          </Box>
          <Box p={20} borderRadius={8} boxShadow={1}>
            <DataText>Notes</DataText>
            {data?.call?.notes?.map((note) => (
              <Typography
                my={10}
                color="grey.dark"
                variant="body2"
                key={note?.id}
              >
                {note.content}
              </Typography>
            ))}
          </Box>
          <Link to="/calls">
            <Typography textAlign="center">Return</Typography>
          </Link>
        </Spacer>
      )}
    </Flex>
  );
};
export default CallDetails;
