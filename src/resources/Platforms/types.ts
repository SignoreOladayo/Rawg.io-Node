import { z } from "zod";
import {PlatformParentSchema, PlatformSchema} from "./platforms.schema";
import { TList, TOrderByFields } from "../../types/shared";

export type TPlatform = z.input<typeof PlatformSchema>;
export type TPlatformList = TList<TPlatform>;
export type TPlatformResponse = z.output<typeof PlatformSchema>;
export type TPlatformListResponse = TList<TPlatformResponse>;
export type TPlatformOrderByFields = TOrderByFields<TPlatform,  "name" | "games_count" | "year_start" | "year_end">;

export type TPlatformParent = z.input<typeof PlatformParentSchema>;
export type TPlatformParentResponse = z.output<typeof PlatformParentSchema>;
export type TPlatformParentList = TList<TPlatformParent>;
export type TPlatformParentListResponse = TList<TPlatformParentResponse>;