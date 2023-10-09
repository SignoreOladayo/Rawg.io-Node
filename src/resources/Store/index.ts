import Rawg from "../..";
import { serializeList, serializeResource } from "../../common/serializer";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { TStore, TStoreList, TStoreListResponse, TStoreOrderByFields, TStoreResponse } from "./types";

class Store {
    rawg: Rawg;

    order?: keyof TStoreOrderByFields | `-${keyof TStoreOrderByFields}`;

    constructor(rawg: Rawg) {
        this.rawg = rawg;
    }

    orderBy(field: keyof TStoreOrderByFields, direction: "ASC" | "DESC" = "ASC") {
        const order = direction === "ASC" ? field : `-${field}`;
        this.order = order as unknown as keyof TStoreOrderByFields;
        return this;
    }

    async list(paginationOptions?: Partial<TPaginationParams>): Promise<TStoreListResponse> {
        const params = buildQueryParams({ordering: this.order}, paginationOptions);
        const response = await this.rawg.request<TStoreList>('stores', params);
        return serializeList<TStoreList, Partial<TStore>, TStoreResponse>(response);
    }

    async details(key: number) {
        const response = await this.rawg.request<TStore>(`stores/${key}`);
        return serializeResource<TStore, TStoreResponse>(response);
    }
}

export default Store;