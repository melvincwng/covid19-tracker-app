import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      Update: As of 16/12/2023, there are still no publicly available APIs that
      provide all the relevant COVID-19 related statistics*.
      <br />
    </div>
  );
}

export default NotificationBar;
