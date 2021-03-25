import React, { useState, useEffect } from "react";
import styles from './EditArticle.module.css'
import axios from 'axios';
import Loader from "react-loader-spinner";

function EditArticle(props) {
    const articleID = props.match.params.id;
    const url = `https://covid19-tracker-app-express.herokuapp.com/articles/${articleID}`;
    const [ article, setArticle ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ disabled, setDisabled ] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(e) {
        async function fetchMyAPI() {
            try {
                const editedArticleOutcome = await axios.put(url, formData, { withCredentials: true });
                console.log(editedArticleOutcome)
                //alert('Article edited!');
                //setDisabled(false);
                //window.location.href = '/articles'
            } catch (err) {
                console.log(err)
            }
        }
        e.preventDefault();
        setDisabled(true);
        let formElement = document.getElementById("form");
        let formData = new FormData(formElement);
        fetchMyAPI();
    }
    
    function handleTitleChange(e) {
        setArticle(article => ({ ...article, title: e.target.value}))
    }

    function handleBodyChange(e) {
        setArticle(article => ({ ...article, body: e.target.value}))
    }

    function handleNameChange(e) {
        setArticle(article => ({ ...article, authorName: e.target.value}))
    }

    const singleArticleContainer = 
        <form className={styles.form} id="form" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h3>Edit article</h3>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value={article.title} onChange={handleTitleChange} placeholder="Add a catchy title..." required></input>
            <label for="body" className={styles.spacing}>Body:</label>
            <textarea type="text" id="body" name="body" value={article.body} onChange={handleBodyChange} placeholder="Write your article here..." required></textarea>
            <label for="authorName" className={styles.spacing}>Author Name:</label>
            <input type="text" id="authorName" name="authorName" value={article.authorName} onChange={handleNameChange} placeholder="Your name..." required></input>
            <input type="submit" value="Update" disabled={disabled} className={styles.button}></input>            
        </form>

    return (
        <div className={styles.container}>
          { isLoading ? <div className={styles.loader}><Loader type="TailSpin" color="black" height={80} width={80} /></div> : singleArticleContainer}
        </div>
    );
}

export default EditArticle;

//disabled={disabled}
