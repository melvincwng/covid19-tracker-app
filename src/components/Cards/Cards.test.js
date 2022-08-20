import Cards from "./Cards";
import { render } from "@testing-library/react";

test("should display Cards info", () => {
  const { getAllByText, getByText } = render(
    <Cards
      confirmed={{ value: 0 }}
      recovered={{ value: 0 }}
      deaths={{ value: 0 }}
      lastUpdate="2021-02-18T02:23:24.000Z"
      country="test country"
    />
  );

  // getAllByText returns an array, hence to access the individual cards we do
  // [0] for infected card, [1] for recovered card, [2] for active card, [3] for death card
  expect(getByText("Infected")).toBeInTheDocument();
  expect(getByText("Recovered*")).toBeInTheDocument();
  expect(getByText("Active*")).toBeInTheDocument();
  expect(getByText("Deaths")).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[0]).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[1]).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[2]).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[3]).toBeInTheDocument();
  expect(getAllByText("test country")[0]).toBeInTheDocument();
  expect(getAllByText("test country")[1]).toBeInTheDocument();
  expect(getAllByText("test country")[2]).toBeInTheDocument();
  expect(getAllByText("test country")[3]).toBeInTheDocument();
});

test("should also display Cards info", () => {
  const { getAllByText, getByText } = render(
    <Cards
      confirmed={{ value: 0 }}
      recovered={{ value: 0 }}
      deaths={{ value: 0 }}
      lastUpdate="2021-02-18T02:23:24.000Z"
      country="Singapore"
    />
  );

  // getAllByText returns an array, hence to access the individual cards we do
  // [0] for infected card, [1] for recovered card, [2] for active card, [3] for death card
  expect(getByText("Infected")).toBeInTheDocument();
  expect(getByText("Recovered*")).toBeInTheDocument();
  expect(getByText("Active*")).toBeInTheDocument();
  expect(getByText("Deaths")).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[0]).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[1]).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[2]).toBeInTheDocument();
  expect(getAllByText("Thu Feb 18 2021")[3]).toBeInTheDocument();
  expect(getAllByText("Singapore")[0]).toBeInTheDocument();
  expect(getAllByText("Singapore")[1]).toBeInTheDocument();
  expect(getAllByText("Singapore")[2]).toBeInTheDocument();
  expect(getAllByText("Singapore")[3]).toBeInTheDocument();
});
