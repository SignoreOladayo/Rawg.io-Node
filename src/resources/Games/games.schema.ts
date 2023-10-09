import { z } from "zod";
import { DateTimeSchema } from "../../common/schema";
import { PlatformParentSchema, PlatformSchema } from "../Platforms/platforms.schema";
import { GenreSchema } from "../Genres/schema";
import { StoreSchema } from "../Store/store.schema";
import { TagSchema } from "../Tags/tags.schema";
import { PublisherSchema } from "../Publishers/publishers.shema";
import { DeveloperSchema } from "../Developers/schema";

const CommaSeparatedInts = z.string().refine(val => {
    let allItemsVerifiedAsIntegers = true;
    val.split(',').every(id => {
        if (Number.isNaN(parseInt(id))) {
            allItemsVerifiedAsIntegers = false;
            return false;
        }
    });
    return allItemsVerifiedAsIntegers;
},{
    message: 'Must be an integer or a string of comma separated integers.'
});

const CommaSeparatedDates = z.string().refine(val => {
    let allItemsVerifiedAsDates = true;
    val.split(',').every(item => {
        if (!z.date().safeParse(item)) {
            allItemsVerifiedAsDates = false;
            return false;
        }
    });
    return allItemsVerifiedAsDates;
})

export const GameFilterSchema = z.object({
    search: z.string(),
    search_precise: z.boolean(),
    search_exact: z.boolean(),
    parent_platforms: CommaSeparatedInts,
    platforms: CommaSeparatedInts,
    stores: CommaSeparatedInts,
    developers: z.string(),
    genres: z.string(),
    tags: z.string(),
    creators: z.string(),
    dates: CommaSeparatedDates,
    updated: CommaSeparatedDates,
    platforms_count: z.number(),
    metacritic: CommaSeparatedInts,
    exclude_collection: z.number(),
    exclude_additions: z.boolean(),
    exclude_parents: z.boolean(),
    exclude_game_series: z.boolean(),
    exclude_stores: CommaSeparatedInts
});

export const RatingSchema = z.object({
    id: z.number(),
    title: z.string(),
    count: z.number(),
    percent: z.number(),
});

export const AddedByStatusSchema = z.object({
    yet: z.number(),
    owned: z.number(),
    beaten: z.number(),
    toplay: z.number(),
    dropped: z.number(),
    playing: z.number(),
});

const GameRequirementSchema = z.object({minimum: z.string(), recommended: z.string()}).nullable();

export const GameSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    released: z.date(),
    tba: z.boolean(),
    background_image: z.string(),
    rating: z.number(),
    rating_top: z.number(),
    ratings: z.array(RatingSchema),
    ratings_count: z.number(),
    reviews_text_count: z.number(),
    added: z.number(),
    added_by_status: AddedByStatusSchema,
    metacritic: z.number(),
    playtime: z.number(),
    suggestions_count: z.number(),
    updated: DateTimeSchema,
    user_game: z.null(),
    reviews_count: z.number(),
    saturated_color: z.string(),
    dominant_color: z.string(),
    platforms: z.array(
        z.object({
          platform: PlatformSchema,
          released_at: z.date(),
          requirements_en: GameRequirementSchema,
          requirements_ru: GameRequirementSchema
        }).transform(val => {
            const  {
                released_at: releasedAt,
                requirements_ru: requirementsRu,
                requirements_en: requirementsEn,
                ...rest
            } = val;
            return {...rest, releasedAt, requirementsRu, requirementsEn}
        })
    ),
    parent_platforms: z.array(
      z.object({
        platform: PlatformParentSchema
      })
    ),
    genres: z.array(GenreSchema),
    stores: z.array(
      z.object({
        id: z.number(),
        store: StoreSchema,
      })
    ),
    clip: z.string().nullable(),
    tags: z.array(TagSchema),
    esrb_rating: z.object({ id: z.number(), name: z.string(), slug: z.string() }),
    short_screenshots: z.array(z.object({ id: z.number(), image: z.string() }))
  });

  export const GameResponseSchema = GameSchema.transform(val => {
    const {
        background_image: backgroundImage,
        rating_top: ratingTop,
        ratings_count: ratingsCount,
        reviews_text_count: reviewsTextCount,
        added_by_status: addedByStatus,
        suggestions_count: suggestionsCount,
        user_game: userGame,
        reviews_count: reviewsCount,
        saturated_color: saturatedColor,
        dominant_color: dominantColor,
        parent_platforms: parentPlatforms,
        esrb_rating: esrbRating,
        short_screenshots: shortScreenshots,
        ...rest
    } = val;
    
    return {
        backgroundImage,
        ratingTop,
        ratingsCount,
        reviewsTextCount,
        addedByStatus,
        suggestionsCount,
        userGame,
        reviewsCount,
        saturatedColor,
        dominantColor,
        parentPlatforms,
        esrbRating,
        shortScreenshots,
        ...rest
    }
  });

  export const GameDetailsSchema = GameSchema.extend({
    name_original: z.string(),
    description: z.string().nullable(),
    description_raw: z.string().nullable(),
    website: z.string().nullable(),
    reactions: z.record(z.number()).nullable(),
    screenshots_count: z.number(),
    background_image_additional: z.string().nullable(),
    developers: z.array(DeveloperSchema),
    metacritic_platforms: z.array(
        z.object({
            metascore: z.number(),
            platform: z.object({
                name: z.string(),
                platform: z.number(),
                slug: z.string(),
            })
        })
    ),
    movies_count: z.number(),
    creators_count: z.number(),
    achievements_count: z.number(),
    parent_achievements_count: z.number(),
    reddit_url: z.string().nullable(),
    reddit_name: z.string().nullable(),
    publishers: z.array(PublisherSchema),
    game_series_count: z.number(),
    additions_count: z.number(),
    parents_count: z.number(),
    metacritic_url: z.string().nullable(),
    alternative_names: z.array(z.string()),
    youtube_count: z.number(),
    twitch_count: z.number(),
    reddit_count: z.number(),
    reddit_logo: z.string().nullable(),
    reddit_description: z.string().nullable(),
}).transform(val => {
    const {
        name_original: nameOriginal, 
        description_raw: descriptionRaw,
        screenshots_count: screenshotsCount,
        background_image_additional: backgroundImageAdditional,
        movies_count: moviesCount,
        creators_count: creatorsCount,
        achievements_count: achievementsCount,
        parent_achievements_count: parentAchievementsCount,
        reddit_url: redditUrl,
        reddit_name: redditName,
        game_series_count: gameSeriesCount,
        additions_count: additionsCount,
        parents_count: parentsCount,
        metacritic_url: metacriticUrl,
        alternative_names: alternativeNames,
        youtube_count: youtubeCount,
        twitch_count: twitchCount,
        reddit_count: redditCount,
        reddit_logo: redditLogo,
        reddit_description: redditDescription,
        metacritic_platforms: metacriticPlatforms,
        ...rest
    } = val;

    return {
        nameOriginal,
        descriptionRaw,
        screenshotsCount,
        backgroundImageAdditional,
        metacriticPlatforms,
        moviesCount,
        creatorsCount,
        achievementsCount,
        parentAchievementsCount,
        redditUrl,
        redditName,
        gameSeriesCount,
        additionsCount,
        parentsCount,
        metacriticUrl,
        alternativeNames,
        youtubeCount,
        twitchCount,
        redditCount,
        redditLogo,
        redditDescription,
        ...rest,
    };
});
