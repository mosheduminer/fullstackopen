import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchField from './components/SearchField'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo';

const App = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])

    const setQueryAndCountriesToShow = (query) => {
        setQuery(query)
        const re = new RegExp(query, "ig")
        setCountriesToShow(countries.filter((country => {
            return country.name.match(re) != null
        })))
    }

    const queryChangeHandler = (event) => {
        setQueryAndCountriesToShow(event.target.value)
    }

    const showHandler = (country) => {
        setQueryAndCountriesToShow(country)
    }

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
                setCountriesToShow(response.data)
            })
    }, [])

    if (countriesToShow.length > 10) {
        return (
            <div>
            <SearchField query={query}
                changeHandler={queryChangeHandler} />
            <div>Too many matches, specify another filter.</div>
        </div>
        )
    } else if (countriesToShow.length > 1) {
        return (
            <div>
                <SearchField query={query}
                    changeHandler={queryChangeHandler} />
                <Countries countries={countriesToShow} showHandler={showHandler} />
            </div>
        )
    } else if (countriesToShow.length === 1) {
        return (
            <div>
                <SearchField query={query}
                    changeHandler={queryChangeHandler} />
                <CountryInfo country={countriesToShow[0]} />
            </div>
        )
    } else {
        return (
            <div>
                <SearchField query={query}
                    changeHandler={queryChangeHandler} />
                <div>No matches found. Specify another filter.</div>
            </div>
        ) 
    }
}

export default App