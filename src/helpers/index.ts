export const buildQueryParams = (queryParams: Record<string, string | number | undefined>, paginationOptions?: {page?: number; page_size?: number}) => {
    const params: Record<string, string> = {};
    Object.entries(queryParams).forEach(([param, value]) => {
        if (value) {
            params[param] = value.toString();
        }
    });

    if (paginationOptions && paginationOptions.page) {
        params['page'] = paginationOptions.page.toString();
    }

    if (paginationOptions && paginationOptions.page_size) {
        params['page_size'] = paginationOptions.page_size.toString();
    }

    return params;
}

export const parsePaginationPointers = (link: string | null): number | null => {
    if (!link) {
        return null;
    }
    const url = new URL(link);
    const page = url.searchParams.get('page');
    return page ? parseInt(page) : null;
}

export const snake2Camel = (key: string) => {
    return key.replace(/([_][a-z])/g, g => g.replace('_', '').toUpperCase());
}

export const deepSnake2Camel = <T extends Record<string, unknown>, K>(object: T): K => {
    const renamed: Partial<K> = {};
    Object.entries(object).map(([key, value]) => {
        const camelKey = snake2Camel(key) as keyof K;
        if (value && typeof value === 'object') {
            renamed[camelKey] = deepSnake2Camel(value as Record<string, unknown>);
            return;
        }
        renamed[camelKey] = value as K[keyof K];
    });
    return renamed as K;
}