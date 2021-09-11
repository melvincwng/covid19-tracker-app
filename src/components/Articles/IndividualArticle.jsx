import React, { useState, useEffect } from "react";
import styles from "./IndividualArticle.module.css";
import axios from "axios";
import Loader from "react-loader-spinner";

function IndividualArticle(props) {
  const articleID = props.match.params.id;
  const url = `https://covid19-tracker-app-express.herokuapp.com/articles/${articleID}`;
  const [article, setArticle] = useState({});
  const [imageBaseUrl, setImageBaseUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const fetchIndividualArticle = async () => {
    try {
      const article = await axios.get(url); //article is an object here with 'data' attribute => article.data gives us the whole article object
      await setIsLoading(false);
      return article.data; //article.data gives us the whole article object
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      await setIsLoading(true);
      const articleObject = await fetchIndividualArticle();
      setArticle(articleObject);

      // Some articles will not have articleImages... while some will have. Hence need to put if statement here...
      if (articleObject.articleImage) {
        setImageBaseUrl(`https://covid19-tracker-app-express.herokuapp.com/images/${articleObject.articleImage}`);
      }
    }
    fetchMyAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const singleArticleContainer = (
    <div>
      <h3>{article.title}</h3>
      <div className={styles.whitespace}>{article.body}</div>
      {imageBaseUrl === "" ? "" : <img src={imageBaseUrl} alt="" className={styles.image}></img>}
      <div className={styles.fontsize}>{article.authorName}</div>
      <div className={styles.fontsize}>
        {new Date(article.postDate).toLocaleDateString("en-GB")}
      </div>
    </div>
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
    </div>
  );
}

export default IndividualArticle;
