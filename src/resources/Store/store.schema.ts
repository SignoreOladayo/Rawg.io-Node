import { z } from "zod";
import { BaseSchema } from "../../common/schema";

export const StoreSchema = BaseSchema.extend({
    domain: z.string().nullable(),
}).transform(val => {
    const {games_count: gamesCount, image_background: imageBackground, ...rest } = val;
    return {
        ...rest,
        gamesCount,
        imageBackground
    };
})