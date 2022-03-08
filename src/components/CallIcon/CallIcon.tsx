import { Icon, VoicemailOutlined, CallFilled } from "@aircall/tractor";

const CallIcon: React.VFC<{ callType: string; size?: string }> = ({
  callType,
  size,
}) => {
  switch (callType) {
    case "voicemail":
      return (
        <Icon
          data-testid="voicemail"
          size={size}
          color="blue.base"
          component={VoicemailOutlined}
        />
      );
    case "answered":
      return <Icon size={size} color="primary.base" component={CallFilled} />;

    case "missed":
      return <Icon size={size} color="red.dark" component={CallFilled} />;
    default:
      return (
        <Icon
          data-testid="defaultIcon"
          size={size}
          color="grey.base"
          component={CallFilled}
        />
      );
  }
};
export default CallIcon;
