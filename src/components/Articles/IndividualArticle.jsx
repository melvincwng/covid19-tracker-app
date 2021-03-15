import React, { useState, useEffect } from "react";
import styles from './IndividualArticle.module.css'
import axios from 'axios';
import Loader from "react-loader-spinner";

function IndividualArticle(props) {
    const articleID = props.match.params.id;
    const url = `https://covid19-tracker-app-express.herokuapp.com/articles/${articleID}`;
    const [ article, setArticle ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);

    const fetchIndividualArticle = async () => {
      try {
        const article = await axios.get(url); //article is an object here with 'data' attribute => article.data gives us the whole article object
        await setIsLoading(false);
        return article.data //article.data gives us the whole article object
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      async function fetchMyAPI() {
        await setIsLoading(true);
        const articleObject = await fetchIndividualArticle();
        setArticle(articleObject);
      }
      fetchMyAPI();
    }, []);

    const singleArticleContainer = 
      <div>
        <h3>{article.title}</h3>
        <div>{article.body}</div>
        <div className={styles.fontsize}>{article.authorName}</div>
        <div className={styles.fontsize}>{(new Date(article.postDate)).toLocaleDateString('en-GB')}</div>
      </div>

    return (
        <div className={styles.container}>
          { isLoading ? <div className={styles.loader}><Loader type="TailSpin" color="black" height={80} width={80} /></div> : singleArticleContainer}
        </div>
      );
}

export default IndividualArticle;