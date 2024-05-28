import React from 'react';
import '../style/alert.css';

function Alert ({message, messageType}) {
    return (<div className='alert-custom'>{message}</div>);
}

export default Alert;