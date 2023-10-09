import Rawg from "../..";
import { serializeList, serializeResource } from "../../common/serializer";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { TDeveloper, TDeveloperList, TDeveloperResponse } from "./types";

class Developers {
    rawg: Rawg;

    constructor(rawg: Rawg) {
        this.rawg = rawg
    }

    async list(paginationOptions?: Partial<TPaginationParams>) {
        const params = buildQueryParams({}, paginationOptions);
        const response = await this.rawg.request<TDeveloperList>('developers', params);
        return serializeList<TDeveloperList, Partial<TDeveloper>, TDeveloperResponse>(response);
    }

    async details(key: number): Promise<TDeveloperResponse> {
        const response = await this.rawg.request<TDeveloper>(`developers/${key}`);
        return serializeResource<TDeveloper, TDeveloperResponse>(response);
    }
}

export default Developers;