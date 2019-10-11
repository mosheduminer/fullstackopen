import React from 'react'


const CountryInfo = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <br />
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h4>Languages</h4>
            <ul>
                {country.languages.map(language => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <div>
                <img src={country.flag} alt="flag" />
            </div>
        </div>
    )
}

export default CountryInfo