import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      Update: As of 20/05/2023, there are no publicly available APIs that
      provide Covid-19 related statistics.
      <br />
      We have a workaround solution which obtains data from other publicly
      available sources*.
      <br />
      Updating of the data will only happen here once per month 😊
    </div>
  );
}

export default NotificationBar;
