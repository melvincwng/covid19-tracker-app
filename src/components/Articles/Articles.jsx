import React, { useState, useEffect, useContext }  from 'react';
import styles from './Articles.module.css';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { UserContext } from './../../UserContext';

const url = "https://covid19-tracker-app-express.herokuapp.com/articles";

function Articles() {
    const [ articles, setArticles ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const { user, setUser } = useContext(UserContext);

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

    //WIP for handleEdit function
    async function handleEdit(e) {
        try {
            e.preventDefault();
            alert('Editing article');
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDelete(e) {
        try {
            e.preventDefault();
            let buttonElement = e.target;
            buttonElement.disabled = true; //cannot use the usual way of const [ disabled, setDisabled ] = useState(false) => because once you click a button, and setDisabled(true) => it will cause not only that button you click to be disabled, but also all the other delete buttons to be disabled as well.
            let articleID = e.target.value;
            const deleteUrl = `https://covid19-tracker-app-express.herokuapp.com/articles/${articleID}`;
            await axios.delete(deleteUrl, { withCredentials: true });
            alert('Article deleted!')
            buttonElement.disabled = false;
            window.location.href = '/articles'
        } catch (err) {
            console.log(err)
        }
    }

    //article.postDate will return a date string.
    // To convert the date string into a readable date, refer to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse &  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

    const articlesContainer = articles.map((article) => 
            <div key={article._id}>
                <h3>{article.title}</h3>
                <div className={styles.limitText}>{article.body}</div>
                <div className={styles.fontsize}>{article.authorName}</div>
                <div className={styles.fontsize}>{(new Date(article.postDate)).toLocaleDateString('en-GB')}</div>
                <a href={`/articles/${article._id}`} target="_blank" rel="noopener noreferrer"><button className={styles.button}>Read more</button></a>
                { user && <button type="submit" value={article._id} onClick={handleEdit} className={styles.button}>Edit</button> }
                { user &&  <button type="submit" value={article._id} onClick={handleDelete} className={styles.button}>Delete</button> }
                <br></br>
                <br></br> 
            </div>
    ).reverse(); // we use .reverse() here to reverse the array so the article posts are listed from most-recent to most-oldest

    const articlesContainerHeader = <h1 className={styles.underline}>Articles</h1>;
    
    return(
        <div className={styles.container}>
            { isLoading ? <div className={styles.loader}><Loader type="TailSpin" color="black" height={80} width={80} /></div> : <div>{articlesContainerHeader} {articlesContainer}</div> }
        </div>
    );
}

export default Articles;