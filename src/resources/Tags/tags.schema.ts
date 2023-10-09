import { z } from "zod";
import { BaseSchema } from "../../common/schema";

export const TagSchema = BaseSchema.extend({
    language: z.string().nullable().optional(),
}).transform(val => {
    const {image_background: imageBackground, games_count: gamesCount, ...rest } = val;
    return {
        ...rest,
        imageBackground,
        gamesCount
    };
})