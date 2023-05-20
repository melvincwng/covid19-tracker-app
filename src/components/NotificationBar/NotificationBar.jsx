import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      Update - 20/05/2023: There are currently no publicly available APIs that
      provide Covid19 related statistics.
      <br />
      We are currently working on a fix to get the data from other sources on
      the web.
      <br />
      Updating of the data will happen once at the end every month 😊
    </div>
  );
}

export default NotificationBar;
