import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      <a
        href="https://github.com/mathdroid/covid-19-api"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        mathdroid/covid-19-api
      </a>{" "}
      - a JSON API external dependency that serves data from{" "}
      <a
        href="https://github.com/CSSEGISandData/COVID-19"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        Johns Hopkins University CSSE
      </a>{" "}
      is <b>DOWN</b> at the moment. As a result, we have migrated to another API
      (
      <a
        href="https://covid19api.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        covid19api.com
      </a>
      ).
      <br />
      However, as{" "}
      <a
        href="https://covid19api.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        covid19api.com
      </a>{" "}
      is a rate-limited API, you might experience some slowness or delays when
      selecting countries on the homepage 😔
      <br />
      We apologize for any inconvenience caused. We will continue to monitor the
      situation and may revert back to the original API if the situation
      improves 😊
    </div>
  );
}

export default NotificationBar;
