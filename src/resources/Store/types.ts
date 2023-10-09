import { z } from "zod";
import { StoreSchema } from "./store.schema";
import { TList, TOrderByFields } from "../../types/shared";

export type TStore = z.input<typeof StoreSchema>;
export type TStoreResponse = z.output<typeof StoreSchema>;
export type TStoreList = TList<TStore>;
export type TStoreListResponse = TList<TStoreResponse>;
export type TStoreOrderByFields = TOrderByFields<TStore, "name" | "games_count">;