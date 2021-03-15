import React, { useState, useEffect } from "react";
import styles from './IndividualArticle.module.css'
import axios from 'axios';

function IndividualArticle(props) {
    const articleID = props.match.params.id;
    const url = `https://covid19-tracker-app-express.herokuapp.com/articles/${articleID}`;
    const [ article, setArticle ] = useState({});

    const fetchIndividualArticle = async () => {
      try {
        const article = await axios.get(url); //article is an object here with 'data' attribute => article.data gives us the whole article object
        return article.data //article.data gives us the whole article object
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      async function fetchMyAPI() {
        const articleObject = await fetchIndividualArticle()
        setArticle(articleObject)
      }
      fetchMyAPI();
    })

    const singleArticleContainer = 
      <div>
        <h3>{article.title}</h3>
        <div className={styles.limitText}>{article.body}</div>
        <div className={styles.fontsize}>{article.authorName}</div>
        <div className={styles.fontsize}>{(new Date(article.postDate)).toLocaleDateString('en-GB')}</div>
      </div>

    return (
        <div>{singleArticleContainer}</div>
      );
}

export default IndividualArticle;