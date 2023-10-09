import Store from ".";
import Rawg from "../..";
import { StoreSchema } from "./store.schema";

describe('Store', () => {
    it('should retrieve a list of stores with default ordering and pagination', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Store 1',
            games_count: 5
          },
          {
            id: 2,
            name: 'Store 2',
            games_count: 10
          }
        ]
      });

      const store = new Store(new Rawg('API_KEY'));
      const result = await store.list();

      expect(mockRequest).toHaveBeenCalledWith('stores', { ordering: undefined });
      expect(result.count).toBe(2);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
      expect(result.results.length).toBe(2);
      expect(result.results[0].id).toBe(1);
      expect(result.results[0].name).toBe('Store 1');
      expect(result.results[0].gamesCount).toBe(5);
      expect(result.results[1].id).toBe(2);
      expect(result.results[1].name).toBe('Store 2');
      expect(result.results[1].gamesCount).toBe(10);

      mockRequest.mockRestore();
    });

    it('should retrieve details of a store', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        id: 1,
        name: 'Store 1',
        games_count: 5
      });

      const store = new Store(new Rawg('API_KEY'));
      const result = await store.details(1);

      expect(mockRequest).toHaveBeenCalledWith('stores/1');
      expect(result.id).toBe(1);
      expect(result.name).toBe('Store 1');
      expect(result.gamesCount).toBe(5);

      mockRequest.mockRestore();
    });
    it('should order the list of stores by games_count in descending order', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Store 1',
            games_count: 5
          },
          {
            id: 2,
            name: 'Store 2',
            games_count: 10
          }
        ]
      });

      const store = new Store(new Rawg('API_KEY'));
      const result = await store.orderBy('games_count', 'DESC').list();

      expect(mockRequest).toHaveBeenCalledWith('stores', { ordering: '-games_count' });
      expect(result.count).toBe(2);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
      expect(result.results.length).toBe(2);
      expect(result.results[0].id).toBe(1);
      expect(result.results[0].name).toBe('Store 1');
      expect(result.results[0].gamesCount).toBe(5);
      expect(result.results[1].id).toBe(2);
      expect(result.results[1].name).toBe('Store 2');
      expect(result.results[1].gamesCount).toBe(10);

      mockRequest.mockRestore();
    });

    it('should handle error when requesting a list of stores', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockRejectedValueOnce(new Error('Request failed'));

      const store = new Store(new Rawg('API_KEY'));

      await expect(store.list()).rejects.toThrowError('Request failed');

      mockRequest.mockRestore();
    });
    it('should handle error when requesting details of a store', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockRejectedValueOnce(new Error('Request failed'));

      const store = new Store(new Rawg('API_KEY'));

      await expect(store.details(1)).rejects.toThrowError('Request failed');

      mockRequest.mockRestore();
    });
});
