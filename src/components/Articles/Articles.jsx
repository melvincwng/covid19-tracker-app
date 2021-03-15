import React, { useState, useEffect }  from 'react';
import styles from './Articles.module.css';
import axios from 'axios';
import Loader from "react-loader-spinner";

const url = "https://covid19-tracker-app-express.herokuapp.com/articles";

function Articles() {
    const [ articles, setArticles ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const fetchAllArticles = async () => {
        try {
            const articles = await axios.get(url); //articles is an object with 'data' property/attribute
            await setIsLoading(false);
            return articles.data //articles.data is an array of articles
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await setIsLoading(true);
            let articles_array = await fetchAllArticles();
            setArticles(articles_array);
        }
        fetchMyAPI();
    }, []); 

    //article.postDate will return a date string.
    // To convert the date string into a readable date, refer to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse &  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const articlesContainer = articles.map((article) => 
            <div>
                <h1>{article.title}</h1>
                {article.body}
                <br></br>
                {article.authorName}
                <br></br>
                {(new Date(article.postDate)).toLocaleDateString('en-GB')}
            </div>
    );
    
    return(
        <div className={styles.container}>
            { isLoading ? <div className={styles.loader}><Loader type="TailSpin" color="black" height={80} width={80} /></div> : articlesContainer}
        </div>
    );
}

export default Articles;