import { z } from "zod";
import {GenreSchema} from "./schema";
import { TList, TOrderByFields } from "../../types/shared";

export type TGenre = z.input<typeof GenreSchema>;
export type TGenreResponse = z.output<typeof GenreSchema>;
export type TGenreList = TList<TGenreResponse>;
export type TGenreOrderByFields = TOrderByFields<TGenre, "name" | "games_count">;