import CallListItem from ".";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const mockCall = {
  id: "ff47df3f-3e1c-4444-a12d-cc41ce40ac83",
  direction: "outbound",
  from: "+33154235038",
  to: "+33106522562",
  duration: 67951,
  via: "+33114091360",
  is_archived: false,
  call_type: "missed",
  created_at: "2022-03-04T19:17:07.325Z",
  notes: [
    {
      id: "4ffe336e-6572-4840-9834-bf8eda2e6236",
      content: "Voluptatem eum minus asperiores.",
    },
    {
      id: "d789dc06-b88b-4d7d-baba-1405cd7e44ce",
      content: "Explicabo aut pariatur.",
    },
  ],
};

describe("CallListItem component", () => {
  it("should render the information which is passed in the call prop", () => {
    render(
      <MemoryRouter>
        <CallListItem call={mockCall} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockCall.from)).toBeTruthy();
  });
  it("should use the id from the call prop in the link address to the detail page", () => {
    render(
      <MemoryRouter>
        <CallListItem call={mockCall} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("detailLink")).toHaveProperty(
      "href",
      `${window.location.origin}/call/${mockCall.id}`
    );
  });
});
