import Rawg from "../..";
import { serializeList, serializeResource } from "../../common/serializer";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { TPlatform, TPlatformList, TPlatformListResponse, TPlatformOrderByFields, TPlatformParent, TPlatformParentList, TPlatformParentListResponse, TPlatformParentResponse, TPlatformResponse } from "./types";

class Platform {
    rawg: Rawg;

    order?: keyof TPlatformOrderByFields | `-${keyof TPlatformOrderByFields}`;

    constructor(rawg: Rawg) {
        this.rawg = rawg;
    }

    async list(paginationOptions?: Partial<TPaginationParams>): Promise<TPlatformListResponse> {
        const params = buildQueryParams({ordering: this.order}, paginationOptions);
        const response = await this.rawg.request<TPlatformList>('platforms', params);
        return serializeList<TPlatformList, Partial<TPlatform>, TPlatformResponse>(response);
    }

    async parents(paginationOptions?: Partial<TPaginationParams>): Promise<TPlatformParentListResponse> {
        const params = buildQueryParams({ordering: this.order}, paginationOptions);
        const response = await this.rawg.request<TPlatformParentList>('platforms/lists/parents', params);
        return serializeList<TPlatformParentList, Partial<TPlatformParent>, TPlatformParentResponse>(response);
    }

    async details(key: number) {
        const response = await this.rawg.request<TPlatform>(`platforms/${key}`);
        return serializeResource<TPlatform, TPlatformResponse>(response);
    }

    orderBy(field: keyof TPlatformOrderByFields, direction: "ASC" | "DESC" = "ASC") {
        const order = direction === "ASC" ? field : `-${field}`;
        this.order = order as unknown as keyof TPlatformOrderByFields;
        return this;
    }
}

export default Platform;