import React from 'react';
import '../style/validation-message.css';

function ValidationMessage ({message}) {
    return (<div className='validation-message'>{message}</div>);
}

export default ValidationMessage;