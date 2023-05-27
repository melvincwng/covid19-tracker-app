import React, { useState, useEffect } from "react";
import styles from "./IndividualArticle.module.css";
import axios from "axios";
import Loader from "react-loader-spinner";
import stylesTwo from "../../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faItchIo } from "@fortawesome/free-brands-svg-icons";
import { openGithubLink, openItchLink, openCoffeeLink } from "../../App";

function IndividualArticle(props) {
  const articleID = props.match.params.id;
  const url = `${process.env.REACT_APP_BACKEND_API_URL}/articles/${articleID}`;
  const [article, setArticle] = useState({});
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchIndividualArticle = async () => {
    try {
      const article = await axios.get(url); //article is an object here with 'data' attribute => article.data gives us the whole article object
      await setIsLoading(false);
      /**
       * 3 scenarios can happen when trying to fetch an individual article:
       *    a) We fetch an article that exists/still exists and is not deleted (returns a valid article object with 'data' key, containing valid article data),
       *    b) We fetch an article that previously existed but then got deleted (this scenario returns an article obj with 'data' key = null instead of throwing error), and
       *    c) We fetch an article that does not exist at all (this one throw err object from backend covid19-tracker-app-express repo)
       *
       * ISSUE: Specifically for scenario B --> Since, it doesn't throw error, it results in a page showing 'Invalid Date' instead
       * SOLUTION: To fix this issue, when article.data === null, we make it throw an error exception --> this results in showing the 'Error 404: Page not found' message
       */
      if (article.data === null) {
        throw new Error({ errorMessage: "Error 404: Page not found" });
      }
      return article.data; //article.data gives us the whole article object
    } catch (err) {
      // if user tries to access via URL an non-existent article/article ID -> return an error 404 object with the message below:
      const error404Object = { errorMessage: "Error 404: Page not found" };
      await setIsLoading(false);
      return error404Object;
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      await setIsLoading(true);
      const articleObject = await fetchIndividualArticle();
      setArticle(articleObject);

      // Some articles will not have articleImages... while some will have. Hence need to put if statement here...
      if (articleObject?.articleImage) {
        setImageBaseUrl(
          `${process.env.REACT_APP_BACKEND_API_URL}/images/${articleObject.articleImage}`
        );
      }
    }
    fetchMyAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const singleArticleContainer = !article?.errorMessage ? (
    <div>
      <h3>{article?.title}</h3>
      <div className={styles.whitespace}>{article?.body}</div>
      {imageBaseUrl === "" ? (
        ""
      ) : (
        <img src={imageBaseUrl} alt="" className={styles.image}></img>
      )}
      <div className={styles.fontsize}>{article?.authorName}</div>
      <div className={styles.fontsize}>
        {new Date(article?.postDate).toLocaleDateString("en-GB")}
      </div>
    </div>
  ) : (
    <h1 className={styles.forbidden}>Error 404: Page not found</h1>
  );

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader type="TailSpin" color="black" height={80} width={80} />
        </div>
      ) : (
        singleArticleContainer
      )}
      {isLoading ? (
        <div></div>
      ) : !article?.errorMessage ? (
        <footer className={stylesTwo.footer}>
          *Due to the lack of publicly available APIs for COVID-19 data, we have
          ceased updates on this website temporarily till further notice.
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
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default IndividualArticle;
