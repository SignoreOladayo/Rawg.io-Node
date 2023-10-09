import Rawg from "../..";
import { serializeList, serializeResource } from "../../common/serializer";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { TPublisher, TPublisherList, TPublisherListResponse, TPublisherOrderByFields, TPublisherResponse } from "./types";

class Publishers {
    rawg: Rawg;

    order?: keyof TPublisherOrderByFields | `-${keyof TPublisherOrderByFields}`;

    constructor(rawg: Rawg) {
        this.rawg = rawg;
    }

    orderBy(field: keyof TPublisherOrderByFields, direction: "ASC" | "DESC" = "ASC") {
        const order = direction === "ASC" ? field : `-${field}`;
        this.order = order as unknown as keyof TPublisherOrderByFields;
        return this;
    }

    async list(paginationOptions?: Partial<TPaginationParams>): Promise<TPublisherListResponse> {
        const params = buildQueryParams({ordering: this.order}, paginationOptions);
        const response = await this.rawg.request<TPublisherList>('publishers', params);
        return serializeList<TPublisherList, Partial<TPublisher>, TPublisherResponse>(response);
    }

    async details(key: number) {
        const response = await this.rawg.request<TPublisher>(`publishers/${key}`);
        return serializeResource<TPublisher, TPublisherResponse>(response);
    }
}

export default Publishers;