import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      mathdroid/covid-19-api - a JSON API external dependency that serves data
      from John Hopkins University CSSE is <b>DOWN</b> at the moment. As a
      result, we have migrated to another API (covid19api.com).
      <br />
      However, as this is a rate-limited API, you might experience some slowness
      or delays when interacting with the various elements on the homepage 😔
      <br />
      We apologize for any inconvenience caused. We will continue to monitor the
      situation and revert back to the original API if the situation improves 😊
    </div>
  );
}

export default NotificationBar;
