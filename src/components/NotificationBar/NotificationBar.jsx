import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      Update: As of 20/05/2023, there are no publicly available APIs that
      provide COVID-19 related statistics*.
      <br />
    </div>
  );
}

export default NotificationBar;
