import React from 'react'


const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }
    const className = messageType
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification