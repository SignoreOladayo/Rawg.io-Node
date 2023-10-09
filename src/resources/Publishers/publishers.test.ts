import Publishers from ".";
import Rawg from "../..";

describe('Publishers', () => {    it('should retrieve a list of publishers with default ordering and pagination options', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 10,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Publisher 1',
            games_count: 5
          },
          {
            id: 2,
            name: 'Publisher 2',
            games_count: 3
          }
        ]
      });

      const publishers = new Publishers(new Rawg('API_KEY'));
      const response = await publishers.list();

      expect(mockRequest).toHaveBeenCalledWith('publishers', { ordering: undefined });
      expect(response.count).toBe(10);
      expect(response.next).toBeNull();
      expect(response.previous).toBeNull();
      expect(response.results.length).toBe(2);
      expect(response.results[0].id).toBe(1);
      expect(response.results[0].name).toBe('Publisher 1');
      expect(response.results[0].gamesCount).toBe(5);
      expect(response.results[1].id).toBe(2);
      expect(response.results[1].name).toBe('Publisher 2');
      expect(response.results[1].gamesCount).toBe(3);

      mockRequest.mockRestore();
    });

    it('should retrieve details of a publisher by id', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        id: 1,
        name: 'Publisher 1',
        games_count: 5
      });

      const publishers = new Publishers(new Rawg('API_KEY'));
      const response = await publishers.details(1);

      expect(mockRequest).toHaveBeenCalledWith('publishers/1');
      expect(response.id).toBe(1);
      expect(response.name).toBe('Publisher 1');
      expect(response.gamesCount).toBe(5);

      mockRequest.mockRestore();
    });

    it('should order the list of publishers by name in ascending order', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 10,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Publisher A',
            games_count: 5
          },
          {
            id: 2,
            name: 'Publisher B',
            games_count: 3
          }
        ]
      });

      const publishers = new Publishers(new Rawg('API_KEY'));
      const response = await publishers.orderBy('name').list();

      expect(mockRequest).toHaveBeenCalledWith('publishers', { ordering: 'name' });
      expect(response.count).toBe(10);
      expect(response.next).toBeNull();
      expect(response.previous).toBeNull();
      expect(response.results.length).toBe(2);
      expect(response.results[0].id).toBe(1);
      expect(response.results[0].name).toBe('Publisher A');
      expect(response.results[0].gamesCount).toBe(5);
      expect(response.results[1].id).toBe(2);
      expect(response.results[1].name).toBe('Publisher B');
      expect(response.results[1].gamesCount).toBe(3);

      mockRequest.mockRestore();
    });

    it('should handle empty response from list method', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 0,
        next: null,
        previous: null,
        results: []
      });

      const publishers = new Publishers(new Rawg('API_KEY'));
      const response = await publishers.list();

      expect(mockRequest).toHaveBeenCalledWith('publishers', { ordering: undefined });
      expect(response.count).toBe(0);
      expect(response.next).toBeNull();
      expect(response.previous).toBeNull();
      expect(response.results.length).toBe(0);

      mockRequest.mockRestore();
    });

    it('should handle invalid publisher id in details method', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockRejectedValueOnce(new Error('Invalid publisher id'));

      const publishers = new Publishers(new Rawg('API_KEY'));

      await expect(publishers.details(0)).rejects.toThrow('Invalid publisher id');

      mockRequest.mockRestore();
    });
});
