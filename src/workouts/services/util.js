import { validateTitle, validateDescriptionEmptyAllowed } from "../../shared/services/validation"

export const validateCreateExercise = (title, description) => {
    const validated = {
        isValid: true,
        title: '',
        description: ''
    }

    const validatedTitle = validateTitle(title);
    if (validatedTitle !== '') {
        validated.title = validatedTitle;
        validated.isValid = false;
    }

    const validatedDescription = validateDescriptionEmptyAllowed(description);
    if (validatedDescription !== '') {
        validated.description = validatedDescription;
        validated.isValid = false;
    }

    return validated;
}