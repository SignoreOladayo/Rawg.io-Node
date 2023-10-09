import * as z from "zod";
import { GameSchema } from "../../common/schema";

export const DeveloperSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    games_count: z.number().nullable(),
    image_background: z.string(),
    description: z.string().optional(),
    games: z.array(GameSchema).optional(),
}).transform(input => {
    const {games_count: gamesCount, image_background: imageBackground, ...rest} = input;
    return {
        ...rest,
        gamesCount,
        imageBackground
    }
});
