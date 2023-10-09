import Rawg from "../..";
import { serializeList, serializeResource } from "../../common/serializer";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { TTagListResponse, TTagList, TTag, TTagResponse } from "./types";

class Tag {
    rawg: Rawg;

    constructor(rawg: Rawg) {
        this.rawg = rawg;
    }

    async list(paginationOptions?: Partial<TPaginationParams>): Promise<TTagListResponse> {
        const params = buildQueryParams({}, paginationOptions);
        const response = await this.rawg.request<TTagList>('tags', params);
        return serializeList<TTagList, Partial<TTag>, TTagResponse>(response);
    }

    async details(key: number) {
        const response = await this.rawg.request<TTag>(`tags/${key}`);
        return serializeResource<TTag, TTagResponse>(response);
    }
}

export default Tag;