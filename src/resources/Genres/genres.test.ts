import Genre from ".";
import Rawg from "../..";

describe('Genre', () => {
it('should list genres with default ordering and pagination', async () => {
      const rawg = new Rawg('API_KEY');
      const genre = new Genre(rawg);

      const response = {
        count: 10,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Action',
            games_count: 100
          },
          {
            id: 2,
            name: 'Adventure',
            games_count: 200
          }
        ]
      };

      jest.spyOn(rawg, 'request').mockResolvedValue(response);

      const result = await genre.list();

      expect(result.count).toBe(10);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
      expect(result.results.length).toBe(2);
      expect(result.results[0].id).toBe(1);
      expect(result.results[0].name).toBe('Action');
      expect(result.results[0].gamesCount).toBe(100);
      expect(result.results[1].id).toBe(2);
      expect(result.results[1].name).toBe('Adventure');
      expect(result.results[1].gamesCount).toBe(200);
    });

    it('should list genres with custom ordering and pagination', async () => {
      const rawg = new Rawg('API_KEY');
      const genre = new Genre(rawg);

      const response = {
        count: 10,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Action',
            games_count: 100
          },
          {
            id: 2,
            name: 'Adventure',
            games_count: 200
          }
        ]
      };

      jest.spyOn(rawg, 'request').mockResolvedValue(response);

      const result = await genre.orderBy('name').list({ page: 2, page_size: 20 });

      expect(result.count).toBe(10);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
      expect(result.results.length).toBe(2);
      expect(result.results[0].id).toBe(1);
      expect(result.results[0].name).toBe('Action');
      expect(result.results[0].gamesCount).toBe(100);
      expect(result.results[1].id).toBe(2);
      expect(result.results[1].name).toBe('Adventure');
      expect(result.results[1].gamesCount).toBe(200);
    });

    it('should get details of a genre by id', async () => {
      const rawg = new Rawg('API_KEY');
      const genre = new Genre(rawg);

      const response = {
        id: 1,
        name: 'Action',
        games_count: 100
      };

      jest.spyOn(rawg, 'request').mockResolvedValue(response);

      const result = await genre.details(1);

      expect(result.id).toBe(1);
      expect(result.name).toBe('Action');
      expect(result.gamesCount).toBe(100);
    });

    it('should handle empty response when listing genres', async () => {
      const rawg = new Rawg('API_KEY');
      const genre = new Genre(rawg);

      const response = {
        count: 0,
        next: null,
        previous: null,
        results: []
      };

      jest.spyOn(rawg, 'request').mockResolvedValue(response);

      const result = await genre.list();

      expect(result.count).toBe(0);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
      expect(result.results.length).toBe(0);
    });

    it('should handle empty response when getting details of a genre', async () => {
      const rawg = new Rawg('API_KEY');
      const genre = new Genre(rawg);

      const response = {};

      jest.spyOn(rawg, 'request').mockResolvedValue(response);

      const result = await genre.details(1);

      expect(result).toEqual({});
    });
});
