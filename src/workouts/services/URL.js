export const BASE_URL = '/api/v1';

export const LIST_BODY_PARTS = `${BASE_URL}/workouts/bodyParts`;
export const LIST_DEFAULT_AND_CUSTOM_HTTP_REFS = `${BASE_URL}/workouts/httpRefs`;

export const LIST_DEFAULT_WORKOUTS = `${BASE_URL}/workouts/default`;
export const LIST_CUSTOM_WORKOUTS = `${BASE_URL}/workouts`;
export const GET_CUSTOM_WORKOUT_BY_ID = `${BASE_URL}/workouts/`;
export const GET_DEFAULT_WORKOUT_BY_ID = `${BASE_URL}/workouts/default/`;

export const LIST_DEFAULT_EXERCISES = `${BASE_URL}/workouts/exercises/default`;
export const LIST_CUSTOM_EXERCISES = `${BASE_URL}/workouts/exercises`;
export const GET_CUSTOM_EXERCISE_BY_ID = `${BASE_URL}/workouts/exercises/`;
export const GET_DEFAULT_EXERCISE_BY_ID = `${BASE_URL}/workouts/exercises/default/`;
export const CREATE_EXERCISE = `${BASE_URL}/workouts/exercises`;