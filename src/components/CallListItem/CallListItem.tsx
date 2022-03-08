import {
  Grid,
  Flex,
  Icon,
  InformationOutlined,
  Box,
  Typography,
  Spacer,
} from "@aircall/tractor";
import { Call } from "../../graphql/generated/graphql";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import CallIcon from "../CallIcon";

const CallListItem: React.VFC<{ call: Call }> = ({ call }) => {
  return (
    <Grid gridTemplateColumns="min-content 1fr 1fr">
      <Box gridRow="1/3">
        <Flex alignItems="center" py="10px" px="10px">
          <CallIcon callType={call.call_type} />
        </Flex>
      </Box>
      <Flex py="10px" px="20px" alignItems="center" gridRow="1">
        <Typography color="primary.darker">{call.from}</Typography>
      </Flex>
      <Flex pb="10px" px="20px" alignItems="center" gridRow="2">
        <Typography
          color="grey.dark"
          style={{ textTransform: "capitalize" }}
          variant="caption"
        >
          {call.direction}
        </Typography>
      </Flex>
      <Flex px="20px" justifyContent="flex-end" gridRow="1/3">
        <Spacer alignItems="center" space="xs">
          <Typography color="primary.darker">
            {format(new Date(call.created_at), "p")}
          </Typography>
          <Link data-testid="detailLink" to={`/call/${call.id}`}>
            <Icon component={InformationOutlined} />
          </Link>
        </Spacer>
      </Flex>
    </Grid>
  );
};

export default CallListItem;
