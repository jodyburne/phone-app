import { render, screen } from "@testing-library/react";
import CallIcon from ".";

describe("CallIcon component", () => {
  it('when the callType prop provided is "voicemail",a voicemail icon should be rendered', () => {
    render(<CallIcon callType="voicemail" />);
    expect(screen.getByTestId("voicemail")).toBeTruthy();
  });
  it("when an unexpected callType prop provided, it should render a default icon", () => {
    render(<CallIcon callType="helloooo" />);
    expect(screen.getByTestId("defaultIcon")).toBeTruthy();
  });
});
