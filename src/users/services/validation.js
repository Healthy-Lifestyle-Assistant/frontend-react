const containsForbiddenChars = (str, forbiddenChars) => {
    return forbiddenChars.some(char => str.includes(char));
};

export const validateEmail = (email) => {
    const emailInvalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '*'];
    const minEmailLength = 3;
    const maxEmailLength = 50;
    let message = '';

    if (email) {
        const [localPart, domain] = email.split('@', 2);

        if (!localPart.length || !domain.length) {
            message += 'Email should contain an "@" symbol with text before and after it. ';
        } else {
            const domainParts = domain.split('.');
            const isDomainInvalid = domainParts.length < 2
                || domainParts.some(part => !part.length)
                || domainParts[0].length === 0
                || domainParts[domainParts.length - 1].length === 0;

            if (isDomainInvalid) {
                message += 'Email should contain a "." symbol (not the first or last character). ';
            }
        }

        if (email.length < minEmailLength || email.length > maxEmailLength) {
            message += 'Email length should be between ' + minEmailLength + ' and ' + maxEmailLength + ' characters. ';
        }

        if (containsForbiddenChars(email, emailInvalidChars)) {
            message += `Email contains forbidden characters: (${emailInvalidChars.join(' ')}). `;
        }
    } else {
        message += 'Email is required. ';
    }

    return message;
};

export const validatePassword = (password) => {
    const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '*'];
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    if (password) {
        if (password !== '' && password !== null && password !== undefined) {
            if (password.length < minLength || password.length > maxLength) {
                message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
            }

            if (containsForbiddenChars(password, invalidChars)) {
                message += `Password contains forbidden characters: (${invalidChars.join(' ')}). `;
            }
        }
    }

    return message;
};

export const validateConfirmPassword = (password, confirmPassword) => {
    let message = '';

    if (confirmPassword) {
        message += validatePassword(confirmPassword);
        if (confirmPassword !== password) {
            message += 'Passwords do not match. ';
        }
    }

    return message;
};

export const validateCountry = (country) => {
    let message = '';

    if (!country) {
        message += 'Country is required. ';
    }

    return message;
};

export const validateTimezone = (timezone) => {
    let message = '';

    if (!timezone) {
        message += 'Timezone is required. ';
    }

    return message;
};

export const validateAge = (age) => {
    let message = '';

    if (age) {
        const ageNumber = Number(age);
        if (isNaN(ageNumber)) {
            message += 'Age should be a number';
        } else {
            if (ageNumber <= 0) {
                message += 'Age should be a positive number. ';
            }
        }
    }

    return message;
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

export const validateForm = (formData) => {
    const errors = {
        fullName: validateTitle(formData.fullName),
        username: validateTitle(formData.username),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
        countryId: validateCountry(formData.countryId),
        timezoneId: validateTimezone(formData.timezoneId),
        age: validateAge(formData.age),
    };

    const isValid = Object.values(errors).every((error) => error === '');

    return {
        isValid,
        ...errors
    };
};