'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import HttpException from "http-exception";

function validateMeal(meal) {
    if (!meal.title) {
        throw new HttpException('Title is required');
    }
    if (!meal.summary) {
        throw new HttpException('Summary is required');
    }
    if (!meal.instructions) {
        throw new HttpException('Instructions are required');
    }
    if (!meal.image) {
        throw new HttpException('Image is required');
    }
    if (!meal.creator) {
        throw new HttpException('Creator is required');
    }
    if (!meal.creator_email) {
        throw new HttpException('Creator email is required');
    }
    if (!meal.creator_email.includes('@')) {
        throw new HttpException('Creator email is invalid');
    }
}

export async function shareMeal(prevState, formData) {
    'use server'
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };
    try {
        validateMeal(meal);
        await saveMeal(meal).then(() => {
            redirect('/meals');
        });
    } catch (error) {
        return { message: error.message };
    }
}
