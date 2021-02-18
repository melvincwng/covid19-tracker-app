import React, { useState, useEffect } from 'react';
import styles from './CountryPicker.module.css'
import { FormControl, NativeSelect } from '@material-ui/core';
import { fetchCountries } from './../../api/index';

function CountryPicker ({ handleSelectedCountry }) {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    console.log(fetchedCountries)

    useEffect(() => {
        async function fetchMyAPI() {
            let fetched_country_names_array = await fetchCountries();
            setFetchedCountries(fetched_country_names_array); // FYI, setSomething() will cause component to render again.
        }
        fetchMyAPI()
    }, []);

    // FormControl component is a material UI component/container that encapsulates items or components of a form
    // In this case, it is used to wrap the NativeSelect material UI component, which is a drop-down bar with <options></options>
    // Similar to <select></select> dropdown bar with <options></options> in HTML

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleSelectedCountry(e.target.value)} className={styles.font}>
                <option value="">Global</option>
                { fetchedCountries.map((country) => <option value={country}>{country}</option>) }
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
