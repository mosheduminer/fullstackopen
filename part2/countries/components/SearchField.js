import React from 'react'


const SearchField = ({ query, changeHandler }) => {
    return (
        <div>
            Search for: <input value={query} onChange={changeHandler} />
        </div>
    )
}

export default SearchField