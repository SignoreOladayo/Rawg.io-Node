import Developers from ".";
import Rawg from "../..";
import { DeveloperSchema } from "./schema";

describe('Developers', () => {
    it('should return a list of developers when called with default parameters', async () => {
      const rawgMock = new Rawg('API_KEY');
      rawgMock.request = jest.fn().mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Developer 1',
            description: 'Description 1',
          },
          {
            id: 2,
            name: 'Developer 2',
            description: 'Description 2',
          },
        ],
      });

      const developers = new Developers(rawgMock);
      const result = await developers.list();

      expect(result.count).toBe(2);
      expect(result.results.length).toBe(2);
    });

    it('should return a developer object when called with a valid developer id', async () => {
      const rawgMock = new Rawg('API_KEY');
      rawgMock.request = jest.fn().mockResolvedValue({
        id: 1,
        name: 'Developer 1',
        description: 'Description 1',
      });

      const developers = new Developers(rawgMock);
      const result = await developers.details(1);

      expect(result.id).toBe(1);
      expect(result.name).toBe('Developer 1');
      expect(result.description).toBe('Description 1');
    });

    it('should throw an error when called with an invalid developer id', async () => {
      const rawgMock = new Rawg('API_KEY');
      rawgMock.request = jest.fn().mockRejectedValue(new Error('Invalid developer id'));

      const developers = new Developers(rawgMock);

      await expect(developers.details(999)).rejects.toThrowError('Invalid developer id');
    });

    it('should return an empty list when called with pagination options that exceed the number of available developers', async () => {
      const rawgMock = new Rawg('API_KEY');
      rawgMock.request = jest.fn().mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      const developers = new Developers(rawgMock);
      const result = await developers.list({ page: 2, page_size: 10 });

      expect(result.count).toBe(0);
      expect(result.results.length).toBe(0);
    });

    it('should return a list of developers with correct pagination when called with pagination options', async () => {
      const rawgMock = new Rawg('API_KEY');
      rawgMock.request = jest.fn().mockResolvedValue({
        count: 5,
        next: 'https://api.rawg.io/api/developers?page=2&page_size=2',
        previous: null,
        results: [
          {
            id: 1,
            name: 'Developer 1',
            description: 'Description 1',
          },
          {
            id: 2,
            name: 'Developer 2',
            description: 'Description 2',
          },
        ],
      });

      const developers = new Developers(rawgMock);
      const result = await developers.list({ page: 1, page_size: 2 });

      expect(result.count).toBe(5);
      expect(result.results.length).toBe(2);
    });

    it('should return a developer object with correct properties', async () => {
      const rawgMock = new Rawg('API_KEY');
      rawgMock.request = jest.fn().mockResolvedValue({
        id: 1,
        name: 'Developer 1',
        description: 'Description 1',
      });

      const developers = new Developers(rawgMock);
      const result = await developers.details(1);

      expect(result.id).toBe(1);
      expect(result.name).toBe('Developer 1');
      expect(result.description).toBe('Description 1');
    });
});
