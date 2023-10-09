import { z } from "zod";
import { GameDetailsSchema, GameFilterSchema, GameResponseSchema, GameSchema } from "./games.schema";
import { TList } from "../../types/shared";
import { BaseSchema } from "../../common/schema";

export type TGame = z.input<typeof GameSchema>;
export type TGameResponse = z.output<typeof GameResponseSchema>;

export type TGameDetail = z.input<typeof GameDetailsSchema>;
export type TGameDetailResponse = z.output<typeof GameDetailsSchema>;

export type TGames = TList<TGame>;
export type TGamesResponseList = TList<TGameResponse>;

export type TFilters = z.infer<typeof GameFilterSchema>;

export type TDevelopmentTeam = z.input<typeof BaseSchema>;
export type TDevelopmentTeamResponse = z.output<typeof BaseSchema>;

export type TDevelopmentTeams = TList<TDevelopmentTeam>

export type TOrderByFields = "name" | "released" | "added" | "created" | "updated" | "rating" | "metacritic";