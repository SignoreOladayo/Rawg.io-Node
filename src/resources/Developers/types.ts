import { z } from "zod";
import { DeveloperSchema } from "./schema";
import { TList } from "../../types/shared";

export type TDeveloper = z.input<typeof DeveloperSchema>;
export type TDeveloperResponse = z.output<typeof DeveloperSchema>;

export type TDeveloperList = TList<TDeveloper>;
export type TDeveloperListResponse = TList<TDeveloperResponse>;