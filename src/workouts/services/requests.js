import {
    DEFAULT_WORKOUTS, CUSTOM_WORKOUTS,
    LIST_DEFAULT_EXERCISES, LIST_CUSTOM_EXERCISES,
    LIST_BODY_PARTS,
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
        body: data
    };
};

export const getCustomWorkouts = async (token) => {
    const response = await fetch(CUSTOM_WORKOUTS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch custom workouts: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};

export const getDefaultExercises = async (urlPostfix) => {
    const response = await fetch(LIST_DEFAULT_EXERCISES + urlPostfix, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch default exercises: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};

export const getCustomExercises = async (token, urlPostfix) => {
    const response = await fetch(LIST_CUSTOM_EXERCISES + urlPostfix, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch custom exercises: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};

export const getBodyParts = async () => {
    const response = await fetch(LIST_BODY_PARTS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch body parts: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};