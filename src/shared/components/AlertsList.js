import React from 'react';
import Alert from './Alert';
import { WARNING, SUCCESS } from '../services/message';

function AlertsList ({messages, messageType}) {
    return (messages.map(item => (
        <Alert key={item["keyName"]} message={`${item["keyName"]}: ${item[item["keyName"]]}`} messageType={messageType} />
    )));
}

export default AlertsList;