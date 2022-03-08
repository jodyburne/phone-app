import { useListCallsQuery, Call } from "../graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, Fragment } from "react";
import { groupBy } from "ramda";
import { format } from "date-fns";
import {
  Typography,
  Button,
  Flex,
  Box,
  Divider,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Spacer,
} from "@aircall/tractor";
import CallListItem from "../components/CallListItem";
import LoadingSpinner from "../components/LoadingSpinner";

const CallList: React.VFC = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useListCallsQuery({
    variables: {
      offset,
      limit: 10,
    },
  });

  const hasNextPage = data?.paginatedCalls?.hasNextPage;
  const calls = data?.paginatedCalls?.nodes;

  const byDay = groupBy((call: Call) => {
    const day = format(new Date(call.created_at), "d MMM");
    return day;
  });

  const groupedCalls = useMemo(
    () => calls && Object.entries(byDay(calls)),
    [calls, byDay]
  );

  if (error) navigate("/home");

  return (
    <Flex bg="grey.lighter" flexDirection="column" alignItems="center">
      {loading && <LoadingSpinner isLoading={loading} />}
      {groupedCalls && (
        <Flex
          p={20}
          style={{
            animation: groupedCalls
              ? "inAnimation 250ms ease-in"
              : "outAnimation 270ms ease-out",
          }}
          flexDirection="column"
          minHeight="100vh"
        >
          <Typography
            pt={40}
            textAlign="center"
            color="primary.base"
            variant="displayM"
          >
            Call List
          </Typography>
          <Spacer py={20} direction="vertical" space="s">
            {groupedCalls
              ?.sort(
                (a, b) => new Date(a[0]).valueOf() - new Date(b[0]).valueOf()
              )
              .map((section) => (
                <Box key={section[0]} p={20} borderRadius={8} boxShadow={1}>
                  <Flex p="5px">
                    <Typography color="grey.darker" variant="caption">
                      {section[0]}
                    </Typography>
                  </Flex>
                  {section[1].map((call, i) => (
                    <Fragment key={call.id}>
                      <CallListItem call={call} />
                      {i !== section[1].length - 1 && (
                        <Divider orientation="horizontal" />
                      )}
                    </Fragment>
                  ))}
                </Box>
              ))}
          </Spacer>

          <Spacer marginTop="auto" justifyContent="space-between" space="m">
            <Button
              size="small"
              mode="link"
              onClick={() => setOffset(offset - 10)}
              disabled={offset === 0}
            >
              <ChevronLeftOutlined />
              Previous
            </Button>
            <Button
              size="small"
              mode="link"
              onClick={() => setOffset(offset + 10)}
              disabled={!hasNextPage}
            >
              Next
              <ChevronRightOutlined />
            </Button>
          </Spacer>
        </Flex>
      )}
    </Flex>
  );
};
export default CallList;
