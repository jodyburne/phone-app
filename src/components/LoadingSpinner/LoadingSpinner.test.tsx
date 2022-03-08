import { render, screen } from "@testing-library/react";
import LoadingSpinner from ".";

describe("LoadingSpinner component", () => {
  it("when the isLoading prop is true, a loading spinner icon should be displayed", () => {
    render(<LoadingSpinner isLoading />);
    expect(screen.getByTestId("spinner")).toBeTruthy();
  });
  it("when the isLoading prop is false, a loading spinner icon should not be displayed", () => {
    render(<LoadingSpinner isLoading={false} />);
    expect(screen.queryByTestId("spinner")).toBeNull();
  });
});
