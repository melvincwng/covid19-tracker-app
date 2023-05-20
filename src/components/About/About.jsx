import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import axios from "axios";
import Loader from "react-loader-spinner";
import stylesTwo from "../../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faItchIo } from "@fortawesome/free-brands-svg-icons";
import { openGithubLink, openItchLink, openCoffeeLink } from "../../App";

const url = `${process.env.REACT_APP_BACKEND_API_URL}/about`;

function About() {
  const [aboutData, setAboutData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAboutProject = async () => {
    try {
      const data = await axios.get(url); //data is an object here, and inside it, it has a key/property called 'data'. And data.data will give us an array, [{title: ..., body: ..., body1: ... etcs}]
      await setIsLoading(false);
      return [
        data.data[0].title,
        data.data[0].body,
        data.data[0].body2,
        data.data[0].body3,
        data.data[0].body4,
      ];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      await setIsLoading(true);
      let data_array = await fetchAboutProject();
      setAboutData(data_array);
    }
    fetchMyAPI();
  }, []);

  const title = aboutData[0];
  const body = aboutData[1];
  const body2 = aboutData[2];
  const body3 = aboutData[3];
  const body4 = aboutData[4];

  const aboutProject = (
    <div>
      <div>{body}</div>
      <br></br>
      <div>{body2}</div>
      <br></br>
      <div>{body3}</div>
      <br></br>
      <div>{body4}</div>
      <br></br>
    </div>
  );

  const aboutProjectHeader = <h1 className={styles.underline}>{title}</h1>;
  const aboutProjectFooter = (
    <div>
      If you are interested in my other projects/portfolio, please visit my
      website at:{" "}
      <a
        href="https://melvincwng.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://melvincwng.github.io/
      </a>
    </div>
  );

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader type="TailSpin" color="black" height={80} width={80} />
        </div>
      ) : (
        <div>
          {aboutProjectHeader} {aboutProject} {aboutProjectFooter}
        </div>
      )}
      <br></br>
      {isLoading ? (
        <div></div>
      ) : (
        <footer className={stylesTwo.footer}>
          *Data Source:{" "}
          <a
            href="https://www.worldometers.info/"
            target="_blank"
            rel="noopener noreferrer"
            className={stylesTwo.fontColor}
          >
            Worldometers.info
          </a>
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
          <div>&copy; {new Date().getFullYear()} Melvin Ng</div>
        </footer>
      )}
    </div>
  );
}

export default About;
