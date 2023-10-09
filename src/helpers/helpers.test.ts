import { buildQueryParams } from ".";

describe('buildQueryParams', () => {
    it('should return an empty object when no queryParams or paginationOptions are provided', () => {
        const result = buildQueryParams({});
        expect(result).toEqual({});
    });

    it('should return an object with queryParams when only queryParams are provided', () => {
        const queryParams = {
            param1: 'value1',
            param2: 'value2'
        };
        const result = buildQueryParams(queryParams);
        expect(result).toEqual(queryParams);
    });

    it('should return an object with queryParams and page when queryParams and paginationOptions with page are provided', () => {
        const queryParams = {
            param1: 'value1',
            param2: 'value2'
        };
        const paginationOptions = {
            page: 1
        };
        const expected = {
            ...queryParams,
            page: '1'
        };
        const result = buildQueryParams(queryParams, paginationOptions);
        expect(result).toEqual(expected);
    });

    it('should return an object with queryParams and page_size when queryParams and paginationOptions with page_size are provided', () => {
        const queryParams = {
            param1: 'value1',
            param2: 'value2'
        };
        const paginationOptions = {
            page_size: 10
        };
        const expected = {
            ...queryParams,
            page_size: '10'
        };
        const result = buildQueryParams(queryParams, paginationOptions);
        expect(result).toEqual(expected);
    });

    it('should return an object with queryParams, page, and page_size when queryParams and paginationOptions with both page and page_size are provided', () => {
        const queryParams = {
            param1: 'value1',
            param2: 'value2'
        };
        const paginationOptions = {
            page: 1,
            page_size: 10
        };
        const expected = {
            ...queryParams,
            page: '1',
            page_size: '10'
        };
        const result = buildQueryParams(queryParams, paginationOptions);
        expect(result).toEqual(expected);
    });

    it('should handle queryParams with special characters', () => {
        const queryParams = {
            'param!@#$%^&*()': 'value!@#$%^&*()'
        };
        const result = buildQueryParams(queryParams);
        expect(result).toEqual(queryParams);
    });
});
