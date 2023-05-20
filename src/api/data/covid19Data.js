/**
 * Latest Covid19 Statistics taken from:
 *    1) https://www.worldometers.info/coronavirus/ (Cards data)
 *    2) https://www.worldometers.info/coronavirus/coronavirus-cases/ (Chart data)
 *    3) https://www.worldometers.info/coronavirus/worldwide-graphs/#daily-deaths (Chart data)
 */

export const covid19GlobalDataForCards = {
  confirmed: { value: 688762502 },
  recovered: { value: 661129835 },
  deaths: { value: 6877607 },
  lastUpdate: "2023-05-20T18:00:00",
};

export const covid19GlobalDataForChart = [
  { confirmed: 0, deaths: 0, date: "2020-01-01" },
  { confirmed: 988, deaths: 17, date: "2020-01-22" },
  { confirmed: 78632, deaths: 2260, date: "2020-02-20" },
  { confirmed: 394789, deaths: 13477, date: "2020-03-21" },
  { confirmed: 2728452, deaths: 197203, date: "2020-04-21" },
  { confirmed: 5427568, deaths: 381253, date: "2020-05-21" },
  { confirmed: 10253605, deaths: 575482, date: "2020-06-27" },
  { confirmed: 16140695, deaths: 725435, date: "2020-07-23" },
  { confirmed: 24051093, deaths: 921563, date: "2020-08-23" },
];
