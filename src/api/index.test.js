import {
  fetchData,
  fetchGlobalDataViaBackupAPI,
  fetchCountryDataViaBackupAPI,
  fetchDailyData,
  fetchDailyGlobalDataViaBackupAPI,
  fetchDailyCountryDataViaBackupAPI,
  fetchCountries,
  fetchCountriesViaBackupAPI,
} from "./index";
import axios from "axios";
jest.mock("axios");

// Write unit tests for all the functions in the index.js file
describe("Tests for the various API calls in index.js", () => {
  it("should test fetchData", async () => {
    const mockResponse = {
      data: {
        confirmed: { value: 100 },
        recovered: { value: 10 },
        deaths: { value: 10 },
        lastUpdate: "2020-04-01T00:00:00Z",
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const mockFetchData = await fetchData();

    expect(mockFetchData).toEqual(mockResponse.data);
  });

  it("should test fetchGlobalDataViaBackupAPI", async () => {
    const mockResponse = {
      data: {
        Global: {
          TotalConfirmed: { value: 100 },
          TotalDeaths: { value: 10 },
          Date: "2020-04-01T00:00:00Z",
        },
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = {
      confirmed: { value: mockResponse.data.Global.TotalConfirmed },
      deaths: { value: mockResponse.data.Global.TotalDeaths },
      lastUpdate: mockResponse.data.Global.Date,
    };

    const mockFetchGlobalDataViaBackupAPI = await fetchGlobalDataViaBackupAPI();

    expect(mockFetchGlobalDataViaBackupAPI).toEqual(expectedResponse);
  });
});
