import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      Update - 20/05/2023:{" "}
      <a
        href="https://covid19api.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        covid19api.com
      </a>{" "}
      is defunct.
      <br />
      We are currently working on a fix to get the data from another source.
      <br />
      We apologize for any inconvenience caused 😔
    </div>
  );
}

export default NotificationBar;
