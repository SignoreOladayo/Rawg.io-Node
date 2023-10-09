import Rawg from "../..";
import { serializeList, serializeResource } from "../../common/serializer";
import { buildQueryParams } from "../../helpers";
import { TPaginationParams } from "../../types/shared";
import { TDevelopmentTeam, TDevelopmentTeamResponse, TDevelopmentTeams, TFilters, TGame, TGameResponse, TGames, TOrderByFields } from "./types";

class Games {
    rawg: Rawg;

    paginationParams = {}

    filters = {};

    order?: string;

    constructor(rawg: Rawg) {
        this.rawg = rawg;
    }

    filterBy(filters: Partial<TFilters>) {
        this.filters = filters;
        return this;
    }

    orderBy(field: TOrderByFields, direction: "ASC" | "DESC" = "ASC") {
        this.order = direction === "ASC" ? field : `-${field}`;
        return this;
    }

    async list(paginationOptions?: Partial<TPaginationParams>) {
        const params = buildQueryParams({...this.filters, order: this.order}, paginationOptions);
        const response = await this.rawg.request<TGames>('games', params);
        return serializeList<TGames, Partial<TGame>, TGameResponse>(response);
    }

    async additions(key: number) {
        const response = await this.rawg.request<TGames>(`games/${key}/additions`);
        return serializeList<TGames, Partial<TGame>, TGameResponse>(response);
    }

    async developmentTeam(key: number) {
        const response = await this.rawg.request<TDevelopmentTeams>(`games/${key}/development-team`);
        return serializeList<TDevelopmentTeams, Partial<TDevelopmentTeam>, TDevelopmentTeamResponse>(response);
    }

    async details(id: number) {
        const response = await this.rawg.request<TGame>(`games/${id}`);
        return serializeResource<TGame, TGameResponse>(response);
    }

}
export default Games;
