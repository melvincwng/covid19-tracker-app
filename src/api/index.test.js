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
import {
  covid19GlobalDataForCards,
  covid19GlobalDataForChart,
  covid19CountriesArray,
  covid19SingaporeDataForCards,
  covid19SingaporeDataForChart
} from "./data/covid19Data.js";
import axios from "axios";
jest.mock("axios");

// Write unit tests for all the functions in the index.js file
// Happy paths
describe("Tests for the various API calls in index.js (HAPPY PATHS)", () => {
  it("should test fetchData without a country (Global data)", async () => {
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

  it("should test fetchData with a country (Country-specific data)", async () => {
    const mockResponse = {
      data: {
        confirmed: { value: 100 },
        recovered: { value: 10 },
        deaths: { value: 10 },
        lastUpdate: "2020-04-01T00:00:00Z",
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const mockFetchData = await fetchData("Cambodia");

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

  it("should test fetchCountryDataViaBackupAPI", async () => {
    const mockResponse = {
      data: [{ Confirmed: 100, Deaths: 10, Date: "2020-04-01T00:00:00Z" }],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = {
      confirmed: { value: mockResponse.data[0].Confirmed },
      deaths: { value: mockResponse.data[0].Deaths },
      lastUpdate: mockResponse.data[0].Date,
    };

    const mockFetchCountryDataViaBackupAPI = await fetchCountryDataViaBackupAPI(
      "Thailand"
    );

    expect(mockFetchCountryDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchDailyData", async () => {
    const mockResponse = {
      data: [
        {
          confirmed: { total: 100 },
          deaths: { total: 10 },
          reportDate: "2020-04-01T00:00:00Z",
        },
      ],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [
      {
        confirmed: mockResponse.data[0].confirmed.total,
        deaths: mockResponse.data[0].deaths.total,
        date: mockResponse.data[0].reportDate,
      },
    ];

    const mockFetchDailyData = await fetchDailyData();

    expect(mockFetchDailyData).toEqual(expectedResponse);
  });

  it("should test fetchDailyGlobalDataViaBackupAPI", async () => {
    const mockResponse = {
      data: [
        { TotalConfirmed: 100, TotalDeaths: 10, Date: "2019-04-01T00:00:00Z" },
        { TotalConfirmed: 200, TotalDeaths: 20, Date: "2020-04-01T00:00:00Z" },
      ],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [
      {
        confirmed: mockResponse.data[0].TotalConfirmed,
        deaths: mockResponse.data[0].TotalDeaths,
        date: mockResponse.data[0].Date.slice(0, 10),
      },
      {
        confirmed: mockResponse.data[1].TotalConfirmed,
        deaths: mockResponse.data[1].TotalDeaths,
        date: mockResponse.data[1].Date.slice(0, 10),
      },
    ];

    const mockFetchDailyGlobalDataViaBackupAPI =
      await fetchDailyGlobalDataViaBackupAPI();

    expect(mockFetchDailyGlobalDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchDailyCountryDataViaBackupAPI", async () => {
    const mockResponse = {
      data: [
        { Confirmed: 100, Deaths: 10, Date: "2019-04-01T00:00:00Z" },
        { Confirmed: 200, Deaths: 20, Date: "2020-04-01T00:00:00Z" },
      ],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [
      {
        confirmed: mockResponse.data[0].Confirmed,
        deaths: mockResponse.data[0].Deaths,
        date: mockResponse.data[0].Date.slice(0, 10),
      },
      {
        confirmed: mockResponse.data[1].Confirmed,
        deaths: mockResponse.data[1].Deaths,
        date: mockResponse.data[1].Date.slice(0, 10),
      },
    ];

    const mockFetchDailyCountryDataViaBackupAPI =
      await fetchDailyCountryDataViaBackupAPI("Thailand");

    expect(mockFetchDailyCountryDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchCountries", async () => {
    const mockResponse = {
      data: {
        countries: [{ name: "Thailand" }, { name: "Malaysia" }],
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = ["Thailand", "Malaysia"];

    const mockFetchCountries = await fetchCountries();

    expect(mockFetchCountries).toEqual(expectedResponse);
  });

  it("should test fetchCountriesViaBackupAPI", async () => {
    const mockResponse = {
      data: [
        { Country: "Thailand" },
        { Country: "Malaysia" },
        { Country: "America" },
        { Country: "Bangladesh" },
        { Country: "Bangladesh" },
      ],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [
      "America",
      "Bangladesh",
      "Bangladesh",
      "Malaysia",
      "Thailand",
    ];

    const mockFetchCountriesViaBackupAPI = await fetchCountriesViaBackupAPI();

    expect(mockFetchCountriesViaBackupAPI).toEqual(expectedResponse);
  });
});

// Unhappy paths one
describe("Tests for the various API calls in index.js (UNHAPPY PATHS ONE)", () => {
  it("should test fetchGlobalDataViaBackupAPI - API success but returns 'response.data === undefined'", async () => {
    const mockResponse = {
      data: undefined,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = {
      confirmed: { value: undefined },
      deaths: { value: undefined },
      lastUpdate: undefined,
    };

    const mockFetchGlobalDataViaBackupAPI = await fetchGlobalDataViaBackupAPI();

    expect(mockFetchGlobalDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchCountryDataViaBackupAPI - API success but returns 'response.data === undefined", async () => {
    const mockResponse = {
      data: undefined,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = {
      confirmed: { value: undefined },
      deaths: { value: undefined },
      lastUpdate: undefined,
    };

    const mockFetchCountryDataViaBackupAPI = await fetchCountryDataViaBackupAPI(
      "Thailand"
    );

    expect(mockFetchCountryDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchDailyData - API success but returns 'response.data === undefined", async () => {
    const mockResponse = {
      data: undefined,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = undefined;

    const mockFetchDailyData = await fetchDailyData();

    expect(mockFetchDailyData).toEqual(expectedResponse);
  });

  it("should test fetchDailyGlobalDataViaBackupAPI - API success but returns 'response.data === undefined", async () => {
    const mockResponse = {
      data: undefined,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [];

    const mockFetchDailyGlobalDataViaBackupAPI =
      await fetchDailyGlobalDataViaBackupAPI();

    expect(mockFetchDailyGlobalDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchDailyCountryDataViaBackupAPI - API success but returns 'response.data === undefined", async () => {
    const mockResponse = {
      data: undefined,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [
      {
        confirmed: undefined,
        deaths: undefined,
        date: undefined,
      },
    ];

    const mockFetchDailyCountryDataViaBackupAPI =
      await fetchDailyCountryDataViaBackupAPI("Thailand");

    expect(mockFetchDailyCountryDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchCountries - API success but returns 'response.data === undefined", async () => {
    const mockResponse = {
      data: undefined,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [];

    const mockFetchCountries = await fetchCountries();

    expect(mockFetchCountries).toEqual(expectedResponse);
  });

  it("should test fetchCountriesViaBackupAPI - API success but returns 'response.data === undefined", async () => {
    const mockResponse = {
      data: undefined,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedResponse = [];

    const mockFetchCountriesViaBackupAPI = await fetchCountriesViaBackupAPI();

    expect(mockFetchCountriesViaBackupAPI).toEqual(expectedResponse);
  });
});

// Unhappy paths two
describe("Tests for the various API calls in index.js (UNHAPPY PATHS TWO)", () => {
  it("should test fetchData error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const mockFetchData = await fetchData();

    expect(mockFetchData).toEqual({});
  });

  it("should test fetchGlobalDataViaBackupAPI error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const mockFetchGlobalDataViaBackupAPI = await fetchGlobalDataViaBackupAPI();

    expect(mockFetchGlobalDataViaBackupAPI).toEqual(covid19GlobalDataForCards);
  });

  it("should test fetchCountryDataViaBackupAPI error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const expectedResponse = covid19SingaporeDataForCards;

    const mockFetchCountryDataViaBackupAPI = await fetchCountryDataViaBackupAPI(
      "Singapore"
    );

    expect(mockFetchCountryDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchDailyData error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const expectedResponse = [];

    const mockFetchDailyData = await fetchDailyData();

    expect(mockFetchDailyData).toEqual(expectedResponse);
  });

  it("should test fetchDailyGlobalDataViaBackupAPI error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const mockFetchDailyGlobalDataViaBackupAPI =
      await fetchDailyGlobalDataViaBackupAPI();

    expect(mockFetchDailyGlobalDataViaBackupAPI).toEqual(
      covid19GlobalDataForChart
    );
  });

  it("should test fetchDailyCountryDataViaBackupAPI error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const expectedResponse = covid19SingaporeDataForChart;

    const mockFetchDailyCountryDataViaBackupAPI =
      await fetchDailyCountryDataViaBackupAPI("Singapore");

    expect(mockFetchDailyCountryDataViaBackupAPI).toEqual(expectedResponse);
  });

  it("should test fetchCountries error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const expectedResponse = [];

    const mockFetchCountries = await fetchCountries();

    expect(mockFetchCountries).toEqual(expectedResponse);
  });

  it("should test fetchCountriesViaBackupAPI error", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API failed"))
    );

    const expectedResponse = covid19CountriesArray;

    const mockFetchCountriesViaBackupAPI = await fetchCountriesViaBackupAPI();

    expect(mockFetchCountriesViaBackupAPI).toEqual(expectedResponse);
  });
});
