import React, { useState, useEffect } from "react";
import styles from "./Extras.module.css";
import Loader from "react-loader-spinner";
import stylesTwo from "../../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faItchIo } from "@fortawesome/free-brands-svg-icons";
import { openGithubLink, openItchLink, openCoffeeLink } from "../../App";

function Extras() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader type="TailSpin" color="black" height={80} width={80} />
        </div>
      ) : (
        <h1 className={styles.underline}>Extras</h1>
      )}
      {isLoading ? (
        ""
      ) : (
        <iframe
          src="https://ourworldindata.org/explorers/coronavirus-data-explorer?zoomToSelection=true&facet=none&pickerSort=desc&pickerMetric=location&Metric=People+vaccinated+%28by+dose%29&Interval=7-day+rolling+average&Relative+to+Population=true&Color+by+test+positivity=false&country=ARE~PRT~CUB~CHL~SGP~CHN~IND~USA~IDN~PAK~BRA~NGA~BGD~RUS~MEX~JPN~ETH~PHL~EGY~VNM~TUR~IRN~DEU~THA~GBR~CAN~FRA~ITA~OWID_WRL~SRB&hideControls=true"
          loading="lazy"
          style={{ width: "100%", height: "600px", border: "0px none" }}
          title="vaccination-charts"
          data-testid="vaccination-charts"
        ></iframe>
      )}
      {isLoading ? (
        ""
      ) : (
        <div>
          References: <br></br>
          Mathieu, E., Ritchie, H., Ortiz-Ospina, E. et al.{" "}
          <a
            href="https://doi.org/10.1038/s41562-021-01122-8"
            rel="noreferrer noopener"
            target="_blank"
            className={styles.citation}
          >
            A global database of COVID-19 vaccinations. Nat Hum Behav (2021)
          </a>
        </div>
      )}
      {isLoading ? (
        ""
      ) : (
        <footer className={stylesTwo.footer} data-testid="footer">
          *As of 4<sup>th</sup> Aug 2021,{" "}
          <a
            href="https://github.com/CSSEGISandData/COVID-19"
            target="_blank"
            rel="noopener noreferrer"
            className={stylesTwo.fontColor}
          >
            Johns Hopkins University CSSE
          </a>{" "}
          is no longer collecting & maintaining certain COVID-19 related data.
          Hence, certain features of this web app may not be available.
          <br></br>
          <b>
            **Medical Disclaimer: All content & information on this website is
            for informational/educational purposes only, and does not constitute
            as medical advice.
          </b>
          <br></br>
          <b>
            **Always seek the advice of your own physician or other qualified
            healthcare provider if you have questions regarding any medical
            condition or treatment.
          </b>
          <hr className={stylesTwo.line}></hr>
          <span>
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              className={stylesTwo.fontAwesome}
              onClick={openGithubLink}
            />
            <FontAwesomeIcon
              icon={faItchIo}
              size="2x"
              className={stylesTwo.fontAwesome}
              onClick={openItchLink}
            />
            <FontAwesomeIcon
              icon={faCoffee}
              size="2x"
              className={stylesTwo.fontAwesomeNoMargin}
              onClick={openCoffeeLink}
            />
          </span>
          <div>&copy; 2022 Melvin Ng</div>
        </footer>
      )}
    </div>
  );
}

export default Extras;
