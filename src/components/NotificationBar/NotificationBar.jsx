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
      - a JSON API that serves data from{" "}
      <a
        href="https://github.com/CSSEGISandData/COVID-19"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        Johns Hopkins University CSSE
      </a>{" "}
      is <b>DOWN</b> at the moment.As a result,{" "}
      <a
        href="https://github.com/melvincwng/covid19-tracker-app"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        we
      </a>{" "}
      have <b>migrated</b> to another API (
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
      selecting countries on the homepage.
      <br />
      Please also take note that the{" "}
      <b>data for some countries might not be available</b> as well. We
      apologize for any inconvenience caused 😔
      <br />
      We will continue to monitor the situation and may revert back to the
      original API if the situation improves 😊
    </div>
  );
}

export default NotificationBar;
