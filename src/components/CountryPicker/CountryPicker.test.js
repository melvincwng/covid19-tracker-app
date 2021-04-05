import CountryPicker from './CountryPicker';
import { render } from '@testing-library/react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("CountryPicker component", () => {
  const countryData = {countries: [{name: "Malaysia"}, {name: "Albania"}, {name:"Thailand"}]};

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render the CountryPicker component", async () => {
    mockAxios
      .onGet("https://covid19.mathdro.id/api/countries")
      .reply(200, countryData);

    const { getByTestId } = render(<CountryPicker />);

    expect(getByTestId("country")).toBeInTheDocument();
  });
});

