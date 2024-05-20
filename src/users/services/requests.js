import { SIGNUP, COUNTRIES } from '../../shared/services/URL.js';

export const getCountries = async () => {
    const response = await fetch(COUNTRIES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};

export const signup = async (requestBody) => {
    const response = await fetch(SIGNUP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    // if (!response.ok) {
        // throw new Error(`Failed to signup: ${response.status}`);
    // }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};
