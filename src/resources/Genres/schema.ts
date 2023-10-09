import { z } from "zod";
import { GameSchema } from "../../common/schema";

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    games_count: z.number().nullable(),
    games: z.array(GameSchema).optional(),
    image_background: z.number().nullable(),
    description: z.string().optional(),
}).transform(val => {
    const {games_count: gamesCount, image_background: imageBackground, ...rest } = val;
    return {
        ...rest,
        gamesCount,
        imageBackground
    }
});