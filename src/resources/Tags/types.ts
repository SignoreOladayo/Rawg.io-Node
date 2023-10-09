import { z } from "zod";
import { TagSchema } from "./tags.schema";
import { TList, TListResponse } from "../../types/shared";

export type TTag = z.input<typeof TagSchema>;
export type TTagResponse = z.output<typeof TagSchema>;
export type TTagList = TList<TTag>;
export type TTagListResponse = TListResponse<TTagResponse>;