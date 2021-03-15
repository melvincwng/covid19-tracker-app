import React, { useState, useEffect }  from 'react';
import styles from './About.module.css';
import axios from 'axios';
import Loader from "react-loader-spinner";

const url = "https://covid19-tracker-app-express.herokuapp.com/about";

function About(){
    const [ aboutData, setAboutData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const fetchAboutProject = async () => {
        try {
            const data = await axios.get(url); //data is an object here, and inside it, it has a key/property called 'data'. And data.data will give us an array, [{title: ..., body: ..., body1: ... etcs}]
            await setIsLoading(false);
            return [data.data[0].title, data.data[0].body, data.data[0].body2, data.data[0].body3, data.data[0].body4]
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await setIsLoading(true);
            let data_array = await fetchAboutProject();
            setAboutData(data_array)
        }
        fetchMyAPI();
    }, []);

    const title = aboutData[0];
    const body = aboutData[1];
    const body2 = aboutData[2];
    const body3 = aboutData[3];
    const body4 = aboutData[4];

    const aboutProject = 
        <div>
            <h1>{title}</h1>
            <div>{body}</div>
            <br></br>
            <div>{body2}</div>
            <br></br>
            <div>{body3}</div>
            <br></br>
            <div>{body4}</div>
            <br></br>
        </div>

    const aboutProjectFooter = <div>If you are interested in my portfolio, please visit my website at: <a href="https://melvincwng.github.io/">https://melvincwng.github.io/</a></div>
    
    return(
        <div className={styles.container}>
            { isLoading ? <div className={styles.loader}><Loader type="TailSpin" color="black" height={80} width={80} /></div> : <div>{aboutProject} {aboutProjectFooter}</div> }
        </div>
    );
}

export default About;