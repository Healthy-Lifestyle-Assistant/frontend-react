import React from 'react';
import { WARNING, SUCCESS } from '../services/message';
import '../style/alert.css';

function Alert ({message, messageType}) {
    return (<div className={'alert-custom' + (messageType === SUCCESS ? " alert-success" : " alert-warning")}>{message}</div>);
}

export default Alert;