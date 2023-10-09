import { deepSnake2Camel, parsePaginationPointers } from "../helpers";
import { TList, TListResponse } from "../types/shared";

export const serializeList = <T extends TList<K>, K extends Record<string, unknown>, P>(list: T): TListResponse<P> => {
    const results: P[] = list.results.map((item: K) => {
        return deepSnake2Camel<K, P>(item);
    });
    return {
        count: list.count,
        next: parsePaginationPointers(list.next),
        previous: parsePaginationPointers(list.previous),
        results
    };
}

export const serializeResource = <T extends Record<string, unknown>, K>(resource: T): K => {
    return deepSnake2Camel<T, K>(resource);
}