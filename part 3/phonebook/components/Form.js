import React from 'react'


const Form = ({nameChangeHandler, newName, numberChangeHandler, newNumber, submitHandler}) => {
    return (
        <form onSubmit={submitHandler}>
            <h3>Add contact</h3>
            <div>
                name: <input value={newName}
                    onChange={nameChangeHandler} />
            </div>
            <div>
                number: <input value={newNumber}
                    onChange={numberChangeHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form