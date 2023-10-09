
export type TList<T> = {
    count:    number;
    next:     string | null;
    previous: string | null;
    results:  T[];
}

export type TListResponse<T> = Omit<TList<T>, "next" |"previous"> & {next: number | null; previous: number | null}

export type TPaginationParams = {
    page_size: number;
    page: number;
};

export type Rating = {
    id: number;
    title: string;
    count: number | null;
    percent: number | null;
}

export type TOrderByFields<T, K extends keyof T> = Pick<T, K>;