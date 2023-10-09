import { z } from "zod";
import { GameSchema } from "../../common/schema";

export const PublisherSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    games: z.array(GameSchema).optional(),
    games_count: z.number().nullable(),
    image_background: z.string(),
    description: z.string().optional(),
}).transform(val => {
    const {games_count: gamesCount, image_background: imageBackground, ...rest } = val;
    return {
        ...rest,
        gamesCount,
        imageBackground
    };
});