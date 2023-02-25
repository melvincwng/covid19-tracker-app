import React from "react";
import styles from "./NotificationBar.module.css";

function NotificationBar() {
  return (
    <div
      className={styles.notificationBar}
      data-testid="error-notification-bar"
    >
      Update:{" "}
      <a
        href="https://github.com/melvincwng/covid19-tracker-app"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fontColor}
      >
        We
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
      Please also take note that{" "}
      <b>the data for some countries might not be available</b> as well. We
      apologize for any inconvenience caused 😔
    </div>
  );
}

export default NotificationBar;
