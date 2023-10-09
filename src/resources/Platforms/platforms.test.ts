import Platform from ".";
import Rawg from "../..";

describe('Platforms', () => {
it('should list platforms with default ordering and pagination options', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Platform 1',
            games_count: 10,
            year_start: 2000,
            year_end: 2020
          },
          {
            id: 2,
            name: 'Platform 2',
            games_count: 5,
            year_start: 1990,
            year_end: 2010
          }
        ]
      });

      const platforms = new Platform(new Rawg('API_KEY'));
      const response = await platforms.list();

      expect(mockRequest).toHaveBeenCalledWith('platforms', { ordering: undefined });
      expect(response.count).toBe(2);
      expect(response.results.length).toBe(2);
      expect(response.results[0].id).toBe(1);
      expect(response.results[0].name).toBe('Platform 1');
      expect(response.results[1].id).toBe(2);
      expect(response.results[1].name).toBe('Platform 2');

      mockRequest.mockRestore();
    });

    it('should get details of a platform', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        id: 1,
        name: 'Platform 1',
        games_count: 10,
        year_start: 2000,
        year_end: 2020
      });

      const platforms = new Platform(new Rawg('API_KEY'));
      const response = await platforms.details(1);

      expect(mockRequest).toHaveBeenCalledWith('platforms/1');
      expect(response.id).toBe(1);
      expect(response.name).toBe('Platform 1');

      mockRequest.mockRestore();
    });

    it('should order platforms by specified field and direction', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Platform 1',
            games_count: 10,
            year_start: 2000,
            year_end: 2020
          },
          {
            id: 2,
            name: 'Platform 2',
            games_count: 5,
            year_start: 1990,
            year_end: 2010
          }
        ]
      });

      const platforms = new Platform(new Rawg('API_KEY'));
      const response = await platforms.orderBy('name', 'DESC').list();

      expect(mockRequest).toHaveBeenCalledWith('platforms', { ordering: '-name' });
      expect(response.count).toBe(2);
      expect(response.results.length).toBe(2);
      expect(response.results[0].id).toBe(1);
      expect(response.results[0].name).toBe('Platform 1');
      expect(response.results[1].id).toBe(2);
      expect(response.results[1].name).toBe('Platform 2');

      mockRequest.mockRestore();
    });

    it('should handle empty list of platforms', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockResolvedValueOnce({
        count: 0,
        next: null,
        previous: null,
        results: []
      });

      const platforms = new Platform(new Rawg('API_KEY'));
      const response = await platforms.list();

      expect(mockRequest).toHaveBeenCalledWith('platforms', { ordering: undefined });
      expect(response.count).toBe(0);
      expect(response.results.length).toBe(0);

      mockRequest.mockRestore();
    });

    it('should handle invalid platform id for details', async () => {
      const mockRequest = jest.spyOn(Rawg.prototype, 'request');
      mockRequest.mockRejectedValueOnce(new Error('Invalid platform id'));

      const platforms = new Platform(new Rawg('API_KEY'));

      await expect(platforms.details(0)).rejects.toThrow('Invalid platform id');

      mockRequest.mockRestore();
    });
});
