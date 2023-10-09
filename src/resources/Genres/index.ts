import Rawg from "../..";
import { serializeList, serializeResource } from "../../common/serializer";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { TGenre, TGenreList, TGenreOrderByFields, TGenreResponse } from "./types";

class Genre {
    rawg: Rawg;

    order? : keyof TGenreOrderByFields | `-${keyof TGenreOrderByFields}`;

    constructor(rawg: Rawg) {
        this.rawg = rawg;
    }

    async list(paginationOptions?: Partial<TPaginationParams>): Promise<TGenreList> {
        const params = buildQueryParams({ordering: this.order}, paginationOptions);
        const response = await this.rawg.request<TGenreList>('genres', params);
        return serializeList<TGenreList, Partial<TGenre>, TGenreResponse>(response);
    }

    async details(key: number) {
        const response = await this.rawg.request<TGenre>(`genres/${key}`);
        return serializeResource<TGenre, TGenreResponse>(response);
    }

    orderBy(field: keyof TGenreOrderByFields, direction: "ASC" | "DESC" = "ASC") {
        const order = direction === "ASC" ? field : `-${field}`;
        this.order = order as unknown as keyof TGenreOrderByFields;
        return this;
    }
}

export default Genre;