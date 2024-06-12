import {
    DEFAULT_WORKOUTS, CUSTOM_WORKOUTS,
    LIST_DEFAULT_EXERCISES, LIST_CUSTOM_EXERCISES,
    LIST_DEFAULT_MEDIA, LIST_CUSTOM_MEDIA
} from '../../shared/services/URL.js';

export const getDefaultWorkouts = async (pageNumber,pageSize, sortField, sortDirection, title, description, needsEquipment) => {
    let searchParam = [];

    if (pageNumber) searchParam.push(`pageNumber=${pageNumber}`);
    if (pageSize) searchParam.push(`pageSize=${pageSize}`);
    if (sortField) searchParam.push(`sortField=${sortField}`);
    if (sortDirection) searchParam.push(`sortDirection=${sortDirection}`);
    if (title) searchParam.push(`title=${title}`);
    if (description) searchParam.push(`description=${description}`);
    if (needsEquipment !== undefined) searchParam.push(`needsEquipment=${needsEquipment}`);

    const response = await fetch(`${DEFAULT_WORKOUTS}${searchParam.length ? `?${searchParam.join('&')}` : ''}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch default workouts: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};

export const getCustomWorkouts = async (token) => {
    const response = await fetch(CUSTOM_WORKOUTS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch custom workouts: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};

export const getDefaultExercises = async () => {
    const response = await fetch(LIST_DEFAULT_EXERCISES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch default exercises: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};

export const getCustomExercises = async (token) => {
    const response = await fetch(LIST_CUSTOM_EXERCISES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch custom exercises: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};

export const getDefaultMedia = async (urlPostfix) => {
    let url = LIST_DEFAULT_MEDIA;
    if (urlPostfix !== '') url += urlPostfix;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch default media: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};

export const getCustomMedia = async (token, urlPostfix) => {
    let url = LIST_CUSTOM_MEDIA;
    if (urlPostfix !== '') url += urlPostfix;
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch custom media: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data,
    };
};
