import React, { useState, useEffect } from 'react'
import contactsService from './services/contacts'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    useEffect(() => {
        contactsService.getAll()
            .then(contacts => {
                setPersons(contacts)
            })
    }, [])

    const filterChangeHandler = (event) => {
        setFilter(event.target.value)
    }
    const nameChangeHandler = (event) => {
        setNewName(event.target.value)
    }
    const numberChangeHandler = (event) => {
        setNewNumber(event.target.value)
    }
    const onDeleteHandler = (id) => {
        const contact_to_delete = persons.filter((el) => el.id === id)[0];
        setMessageType('warning-notification')
        if (window.confirm(`Delete ${contact_to_delete.name}?`)) {
            contactsService.deleteOne(id).catch(() => {
                setMessage(`Information of ${contact_to_delete.name} was already removed from the server`)
            })
            setPersons(persons.filter(el => (
                el.id !== id
            )))
            setMessage(`Information of ${contact_to_delete.name} has been removed from server`)
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (!newName.length) return
        const oldContactList = persons.filter(e => e.name === newName)
        if (oldContactList.length === 0) {
            contactsService.add({ name: newName, number: newNumber }).then(
                returnedContact => {
                    setPersons(persons.concat(returnedContact))
                }
            )
            setMessageType("add-notification")
            setMessage(`Added ${newName}`)
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
        } else {
            const oldContact = oldContactList[0]
            if (window.confirm(`${newName} is already in the phonebook. would you like to overwrite the contact?`)) {
                contactsService.updateOne(oldContact.id, { name: newName, number: newNumber }).then(
                    returned => {
                        const index = persons.indexOf(oldContact)
                        const newPersonsArray = [...persons]
                        newPersonsArray.splice(index, 1, returned.data)
                        setPersons(newPersonsArray)
                    }
                )
                setMessage(`Overwrote ${newName}`)
                setMessageType("add-notification")
                setTimeout(() => {
                    setMessage(null)
                    setMessageType(null)
                }, 5000)
                setNewName('')
                setNewNumber('')
            }
        }
    }

    const re = new RegExp(filter, "gi");
    const filteredPersons = persons.filter((person) => {
        if (person.name.search(re) < 0) {
            return false
        } return true
    })


    return (
        <div>
            <h2>Phonebook</h2>
            <p>Filter by <input value={filter}
                onChange={filterChangeHandler} /></p>
            <Notification message={message} messageType={messageType} />
            <Form nameChangeHandler={nameChangeHandler} name={newName}
                numberChangeHandler={numberChangeHandler} number={newNumber}
                submitHandler={submitHandler} />
            <h2>Numbers</h2>
            <Numbers
                persons={filteredPersons}
                onDeleteHandler={onDeleteHandler}
            />
        </div>
    )
}

export default App