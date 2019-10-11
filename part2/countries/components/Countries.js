import React from 'react'


const Countries = ({ countries, showHandler }) => {
    return (
        <div>
            {countries.map(country => (
                <div key={country.name}>{country.name}
                <button onClick={() => showHandler(country.name)}>show</button></div>
            ))}
        </div>
    )
}

export default Countries