import React from 'react';
import AlertComponent from './AlertComponent';

const AlertsListComponent = ({ messages }) => {
    return (
        <>
            {messages.map((message, index) => (
                <AlertComponent 
                    key={index} 
                    message={message.keyName + ': ' + message[message.keyName]} 
                    messageType={message.messageType} />
            ))}
        </>
    );
};

export default AlertsListComponent;
