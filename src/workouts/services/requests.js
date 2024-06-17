import {
    LIST_DEFAULT_WORKOUTS, LIST_CUSTOM_WORKOUTS,
    LIST_DEFAULT_EXERCISES, LIST_CUSTOM_EXERCISES,
    LIST_BODY_PARTS, GET_CUSTOM_WORKOUT_BY_ID,
    GET_DEFAULT_WORKOUT_BY_ID
} from '../services/URL.js';

export const getDefaultWorkouts = async () => {
    const response = await fetch(LIST_DEFAULT_WORKOUTS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
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
    const response = await fetch(LIST_CUSTOM_WORKOUTS, {
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

export const getDefaultWorkoutById = async (id) => {
    const response = await fetch(GET_DEFAULT_WORKOUT_BY_ID + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch default workout: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};

export const getCustomWorkoutById = async (id, token) => {
    const response = await fetch(GET_CUSTOM_WORKOUT_BY_ID + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch custom workout: ${response.status}`);
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