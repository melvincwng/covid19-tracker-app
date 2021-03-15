import React, { useState, useEffect }  from 'react';
import styles from './Articles.module.css';
import axios from 'axios';
import Loader from "react-loader-spinner";

const url = "https://covid19-tracker-app-express.herokuapp.com/articles";

function Articles() {
    const [ articles, setArticles ] = useState([])

    const fetchAllArticles = async () => {
        try {
            const articles = await axios.get(url); //articles is an object with 'data' property/attribute
            return articles.data //articles.data is an array of articles
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let articles_array = await fetchAllArticles();
            setArticles(articles_array);
        }
        fetchMyAPI();
    }, []); 

    //article.postDate will return a date string.
    // To convert it into a readable data, refer to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse &  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    
    return(
        <div className={styles.container}>
            {articles.map((article) => <div>{article.title} {article.body} {article.authorName} {(new Date(article.postDate)).toLocaleDateString('en-GB')}</div>)}
        </div>
    );
}

export default Articles;