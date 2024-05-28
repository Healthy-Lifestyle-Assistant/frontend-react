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

export const truncateStringWithWordBoundary = (inputString, maxLength) => {
    if (inputString && inputString.length > maxLength) {
        const truncatedText = inputString.substring(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(' ');
        return lastSpaceIndex !== -1 ? truncatedText.substring(0, lastSpaceIndex) + '...' : truncatedText + '...';
    }
    return inputString;
}

export const getStringOrNull = (value) => {
    if (value === null || value.trim() === "") {
        return null;
    }
    return value.trim();
}

export const upperCaseStringToRegular = (string = "ABC") => {
    let formatted = string[0];
    formatted += (string.substring(1, string.length)).toLowerCase();
    return formatted;
}

export const buildUrlMediaFilter = (mediaName, description, isCustom, isDefault, sortField, sortDirection,
    pageSize, pageNumberZeroBased) => {

        if ((mediaName === null || mediaName === '') &&
        (description === null || description === '') &&
        ((isCustom === true && isDefault === true) || (isCustom === false && isDefault === false)) &&
        (sortField === null || sortField === '') &&
        (sortDirection === null || sortDirection === '') &&
        (pageSize === null || pageSize === '') &&
        (pageNumberZeroBased === 0)
    ) return '';

    let urlPostfix = '?';
    if (mediaName !== null && mediaName !== '') urlPostfix += `name=${mediaName}&`;
    if (description !== null && description !== '') urlPostfix += `description=${description}&`;
    if (isCustom === true && isDefault === false) urlPostfix += 'isCustom=true&';
    if (isCustom === false && isDefault === true) urlPostfix += 'isCustom=false&';
    if (sortField !== null && sortField !== '') urlPostfix += `sortField=${sortField}&`;
    if (sortDirection !== null && sortDirection !== '') urlPostfix += `sortDirection=${sortDirection}&`;
    if (pageSize !== null && pageSize !== '') urlPostfix += `pageSize=${pageSize}&`;
    if (pageNumberZeroBased > 0) urlPostfix += `pageNumber=${pageNumberZeroBased}&`;
    return urlPostfix.substring(0, urlPostfix.length - 1);
}