import Rawg from "../..";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { serializeList, serializeResource } from "../../common/serializer";
import { TCreator, TCreatorResponse, TCreatorsList } from "./types";

class Creators {
    rawg: Rawg;

    constructor(rawg: Rawg) {
        this.rawg = rawg
    }
    async list(paginationOptions?: Partial<TPaginationParams>) {
        const params = buildQueryParams({}, paginationOptions);
        const response = await this.rawg.request<TCreatorsList>('creators', params);
        return serializeList<TCreatorsList, Partial<TCreator>, TCreatorResponse>(response);
    }

    async details(key: number) {
        const response = await this.rawg.request<TCreator>(`creators/${key}`);
        return serializeResource<TCreator, TCreatorResponse>(response);
    }
}

export default Creators;