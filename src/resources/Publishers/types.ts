import { z } from "zod";
import { PublisherSchema } from "./publishers.shema";
import { TList, TOrderByFields } from "../../types/shared";

export type TPublisher = z.input<typeof PublisherSchema>;
export type TPublisherResponse = z.output<typeof PublisherSchema>;
export type TPublisherList = TList<TPublisher>;
export type TPublisherListResponse = TList<TPublisherResponse>;
export type TPublisherOrderByFields = TOrderByFields<TPublisher, "name" | "games_count">;