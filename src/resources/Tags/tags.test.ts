import Tag from ".";
import Rawg from "../..";

describe('Tag', () => {    
    it('should successfully list tags with default pagination options', async () => {
      const mockResponse = {
        count: 10,
        next: null,
        previous: null,
        results: [
          { id: 1, name: 'Tag 1' },
          { id: 2, name: 'Tag 2' },
          { id: 3, name: 'Tag 3' }
        ]
      };
      const mockRequest = jest.fn().mockResolvedValue(mockResponse);
      const rawg = new Rawg('API_KEY');
      rawg.request = mockRequest;

      const tag = new Tag(rawg);
      const result = await tag.list();

      expect(result.count).toBe(10);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
      expect(result.results).toHaveLength(3);
    });
    it('should successfully list tags with custom pagination options', async () => {
      const mockResponse = {
        count: 10,
        next: 'https://api.rawg.io/api/tags?page=2',
        previous: null,
        results: [
          { id: 1, name: 'Tag 1' },
          { id: 2, name: 'Tag 2' },
          { id: 3, name: 'Tag 3' }
        ]
      };
      const mockRequest = jest.fn().mockResolvedValue(mockResponse);
      const rawg = new Rawg('API_KEY');
      rawg.request = mockRequest;

      const tag = new Tag(rawg);
      const result = await tag.list({ page: 2, page_size: 5 });

      expect(result.count).toBe(10);
      expect(result.next).toBe(2);
      expect(result.previous).toBeNull();
      expect(result.results).toHaveLength(3);
    });
    it('should successfully retrieve details of a tag', async () => {
      const mockResponse = { id: 1, name: 'Tag 1' };
      const mockRequest = jest.fn().mockResolvedValue(mockResponse);
      const rawg = new Rawg('API_KEY');
      rawg.request = mockRequest;

      const tag = new Tag(rawg);
      const result = await tag.details(1);

      expect(result.id).toBe(1);
      expect(result.name).toBe('Tag 1');
    });
});
