export const buildMessage = (obj) => {
    let messageBuilder = "";
    if (obj === null) {
        messageBuilder = "Unknown error occured"
    } else {
        for (const key in obj) {
            messageBuilder += `${key}: ${obj[key]}. `;
        }
    }
    return messageBuilder;
}

export const buildAlertsList = (obj, messageType) => {
    let alertsList = [];
    if (obj === null) {
        let emptyAlert = {};
        emptyAlert["Unknown"] = "Exception occured";
        emptyAlert["keyName"] = "Unknown";
        emptyAlert["messageType"] = messageType;
        alertsList.push(emptyAlert);
    } else {
        for (const key in obj) {
            let alert = {};
            alert[key] = obj[key];
            alert["keyName"] = key;
            alert["messageType"] = messageType;
            alertsList.push(alert);
        }
    }
    console.log(alertsList);
    return alertsList;
}