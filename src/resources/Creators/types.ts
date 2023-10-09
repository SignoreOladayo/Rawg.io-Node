import { z } from "zod";
import {CreatorSchema} from './creators.schema';
import { TList, TListResponse } from "../../types/shared";

export type TCreator = z.input<typeof CreatorSchema>;
export type TCreatorResponse = z.output<typeof CreatorSchema>;
export type TCreatorsList =  TList<TCreator>;
export type TCreatorListResponse = TListResponse<TCreatorResponse>;
