import Extras from "./Extras";
import { render, waitFor } from "@testing-library/react";

describe("Extras component", () => {
  it("should render the Extras component", async () => {
    const { getByText, getByTestId } = render(<Extras />);

    await waitFor(() => getByText("Extras"));
    expect(getByTestId("vaccination-charts")).toBeInTheDocument();
    expect(getByTestId("footer")).toBeInTheDocument();
  });
});
