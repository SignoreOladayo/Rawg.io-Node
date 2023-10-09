import { z } from "zod";

export const CreatorSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    image: z.string().nullable(),
    image_background: z.string(),
    games_count: z.number().nullable(),
    description: z.string().optional(),
    reviews_count: z.number().optional(),
    rating: z.number().optional(),
    rating_top: z.number().optional(),
    updated: z.string().optional()
}).transform(val => {
    const {image_background: imageBackground, games_count: gamesCount, reviews_count: reviewsCount, rating_top: ratingTop, ...rest} = val;
    return {
        ...rest,
        imageBackground,
        gamesCount,
        reviewsCount,
        ratingTop
    };
});