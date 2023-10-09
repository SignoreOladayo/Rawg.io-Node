import { z } from "zod";

export const GameSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    added: z.number(),
});

export const BaseSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    games_count: z.number().nullable(),
    image_background: z.string(),
    description: z.string().optional(),
});

export const DateTimeSchema = z.string().datetime().refine(val => {
    return val.split('T').length == 2;
}, {
    message: 'invalid datetime format'
})