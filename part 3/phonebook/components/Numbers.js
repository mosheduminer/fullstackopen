import React from 'react'

const Numbers = ({ persons, onDeleteHandler }) => {
    const mapping = persons.map(obj => (
        <div key={obj.name}>
            {obj.name} - {obj.number}
            <button type="button" onClick={() => onDeleteHandler(obj.id)}>
                delete
            </button>
        </div>
    ))
    return (
        <>
            {mapping}
        </>
    )
}

export default Numbers