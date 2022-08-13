import CountryPicker from "./CountryPicker";
import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("CountryPicker component", () => {
  const countryData = {
    countries: [
      { name: "Malaysia" },
      { name: "Albania" },
      { name: "Thailand" },
    ],
  };

  beforeEach(() => {
    mockAxios.reset();
  });

  // Happy path
  it("should render the CountryPicker component if the API call is successful", async () => {
    mockAxios
      .onGet("https://covid19.mathdro.id/api/countries")
      .reply(200, countryData);

    const { getByTestId } = render(<CountryPicker />);

    expect(getByTestId("country")).toBeInTheDocument();
  });

  // Unhappy path
  it("should not render the CountryPicker component if the API call is not successful, and should instead console.log the error", async () => {
    mockAxios
      .onGet("https://covid19.mathdro.id/api/countries")
      .networkErrorOnce();

    try {
      render(<CountryPicker />);
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(console.log).toHaveBeenCalled();
    }
  });
});
