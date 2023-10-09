import { z } from "zod";
import { GameSchema } from "../../common/schema";

export const PlatformSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    games_count: z.number(),
    image_background: z.string(),
    image: z.string().nullable(),
    year_start: z.number().nullable(),
    year_end: z.number().nullable(),
    games: z.array(GameSchema).optional(),
}).transform(val => {
    const {games_count: gamesCount, image_background: imageBackground, year_start: yearStart,  year_end: yearEnd, ...rest} = val;
    return {
        ...rest,
        gamesCount,
        imageBackground,
        yearStart,
        yearEnd
    }
});

export const PlatformParentSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    platforms: z.array(PlatformSchema).optional(),
})