import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      mathdroid/covid-19-api - a JSON API external dependency that serves data
      from John Hopkins University CSSE is <b>DOWN</b> at the moment...
      <br />
      We are trying to resolve this issue... Please check back the homepage at a
      later date 😔
      <br />
      In the meanwhile, you can still check out the other sections of the
      website 🙂
    </div>
  );
}

export default NotificationBar;
