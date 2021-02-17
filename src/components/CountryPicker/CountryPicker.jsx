import React, { useState, useEffect } from 'react';
import styles from './CountryPicker.module.css'
import { FormControl, NativeSelect } from '@material-ui/core';
import { fetchCountries } from './../../api/index';

function CountryPicker ({ handleSelectedCountry }) {
    const [ fetchedCountries, setFetchedCountries ] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
            let fetched_country_names_array = await fetchCountries();
            setFetchedCountries(fetched_country_names_array);
        }
        fetchMyAPI();
    }, []);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="">
                <option value="">Global</option>
                {fetchedCountries.map((country) => <option value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;