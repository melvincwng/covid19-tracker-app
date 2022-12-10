import NotificationBar from "./NotificationBar";
import { render } from "@testing-library/react";

test("It should just render and display a notification bar on the screen", () => {
  const { getByTestId } = render(<NotificationBar />);
  expect(getByTestId("error-notification-bar")).toBeInTheDocument();
});
