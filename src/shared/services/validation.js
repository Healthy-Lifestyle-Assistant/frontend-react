import { NO_UPDATES_REQUEST, SAME_VALUE } from './message';

const containsForbiddenChars = (str, forbiddenChars) => {
    for (let char of str) {
        if (forbiddenChars.includes(char)) {
            return true;
        }
    }
    return false;
};

export const validateTitle = (title) => {
    const invalidChars = ['@', '$', '%', '^', '*'];
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    if (title !== '' && title !== null && title !== undefined) {
        if (title.length < minLength || title.length > maxLength) {
            message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(title, invalidChars)) {
            message += "Contains forbidden characters ('@', '$', ' % ', ' ^ ', ' * '). ";
        }
    }

    return message;
}

export const validateDescription = (description) => {
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    if (description !== null && description !== '') {
        if (description.length < minLength || description.length > maxLength) {
            message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }
    }

    return message;
}

export const validateHttpLink = (link) => {
    let message = '';

    if (!(link.startsWith('http://') || link.startsWith('https://'))) {
        message += 'HTTP link should start with http:// or https://'
    }

    return message;
}

export const validateInput = (title, description) => {
    const invalidChars = ['!', ',', '.', '@', '#', '$', '%', '^', '&', '*', '&'];
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    const containsForbiddenChars = (str, forbiddenChars) => {
        for (let char of str) {
            if (forbiddenChars.includes(char)) {
                return true;
            }
        }
        return false;
    };

    if (title !== '' && title !== null && title !== undefined) {
        if (title.length < minLength || title.length > maxLength) {
            message += 'Title length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(title, invalidChars)) {
            message += 'Title contains forbidden characters. ';
        }
    }

    if (description !== '' && description !== null && description !== undefined) {
        if (description.length < minLength || description.length > maxLength) {
            message += 'Description length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(description, invalidChars)) {
            message += 'Description contains forbidden characters. ';
        }
    }

    if (message !== '') return message;
    return null;
};

export const validateUpdateHttpRef = (currentHttpRef, updateTitle, updateDescription, updateHttpRef, updateHttpRefType) => {
    const result = {
        status: false,
        requestBody: {
            name: null,
            description: null,
            httpRefType: null,
            ref: null
        },
        validation: {
            message: '',
            name: '',
            description: '',
            ref: ''
        }
    }

    // No updates (empty form)
    if ((updateTitle === null || updateTitle === '') &&
        (updateDescription === null || updateDescription === '') &&
        (updateHttpRef === null || updateHttpRef === '') &&
        (updateHttpRefType === null || updateHttpRefType === '')
    ) {
        result.validation.message = NO_UPDATES_REQUEST;
    }

    if (result.validation.message === '') {
        // Updated value is the same
        if ((updateTitle !== null || updateTitle !== '') && updateTitle === currentHttpRef.name) {
            result.validation.name = SAME_VALUE;
        }
        if ((updateDescription !== null || updateDescription !== '') && updateDescription === currentHttpRef.description) {
            result.validation.description = SAME_VALUE;
        }
        if ((updateHttpRef !== null || updateHttpRef !== '') && updateHttpRef === currentHttpRef.ref) {
            result.validation.ref = SAME_VALUE;
        }

        // Length and forbidden chars validation
        if (updateTitle !== null && updateTitle !== '' && updateTitle !== currentHttpRef.name) {
            const validatedMessageTitle = validateTitle(updateTitle);
            if (validatedMessageTitle !== '') {
                result.validation.name += validatedMessageTitle;
            }
        }

        if (updateDescription !== null && updateDescription !== '' && updateDescription !== currentHttpRef.description) {
            const validatedMessageDescription = validateDescription(updateDescription);
            if (validatedMessageDescription !== '') {
                result.validation.description += validatedMessageDescription;
            }
        }

        if (updateHttpRef !== null && updateHttpRef !== '' && updateHttpRef !== currentHttpRef.ref) {
            const validatedMessageHttpRef = validateHttpLink(updateHttpRef);
            if (validatedMessageHttpRef !== '') {
                result.validation.ref += validatedMessageHttpRef;
            }
        }
    }

    // Valid
    if (result.validation.message === '' &&
        result.validation.name === '' &&
        result.validation.description === '' &&
        result.validation.ref === '') {

        result.status = true;
        if (updateTitle !== null && updateTitle !== '') {
            result.requestBody.name = updateTitle;
        }
        if (updateDescription !== null && updateDescription !== '') {
            result.requestBody.description = updateDescription;
        }
        if (updateHttpRef !== null && updateHttpRef !== '') {
            result.requestBody.ref = updateHttpRef;
        }
        if (updateHttpRefType !== null && updateHttpRefType !== '') {
            result.requestBody.httpRefType = updateHttpRefType;
        }
    }
    return result;
}