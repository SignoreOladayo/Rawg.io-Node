import Games from ".";
import Rawg from "../..";

const castObjValuesToString = (obj: Record<string, string|number>) => {
    const casted: Record<string, string> = {};
    Object.entries(obj).map(([key, value]) => casted[key] = value.toString());
    return casted;
}

describe('Games', () => {
    let games: Games;
    let rawg: Rawg;
    let requestMock: jest.SpyInstance<Promise<unknown>>;
    beforeEach(() => {
        rawg = new Rawg('API_KEY');
        games = new Games(rawg);
        requestMock = jest.spyOn(rawg, 'request')
    });
    it('should set the filters property when filterBy method is called', () => {
      const filters = {
        platforms: 'PC',
        genres: 'Action'
      };

      games.filterBy(filters);
      expect(games.filters).toEqual(filters);
    });

    it('should set the order property when orderBy method is called', () => {
      const field = 'name';
      const direction = 'ASC';

      games.orderBy(field, direction);
      expect(games.order).toEqual(field);
    });

    it('should retrieve a list of games with default pagination options when list method is called without pagination options', async () => {
      const expectedResponse = {
        count: 10,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Game 1'
          },
          {
            id: 2,
            name: 'Game 2'
          }
        ]
      };
      requestMock.mockResolvedValue(expectedResponse);
      const response = await games.list();

      expect(response).toEqual(expectedResponse);
      expect(rawg.request).toHaveBeenCalledWith('games', {});
    });

    it('should retrieve a list of games with custom pagination options when list method is called with pagination options', async () => {
      const paginationOptions = {
        page: 2,
        page_size: 20
      };
      const expectedResponse = {
        count: 10,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Game 1'
          },
          {
            id: 2,
            name: 'Game 2'
          }
        ]
      };
      requestMock.mockResolvedValue(expectedResponse);
      const response = await games.list(paginationOptions);

      expect(response).toEqual(expectedResponse);
      expect(rawg.request).toHaveBeenCalledWith('games', castObjValuesToString(paginationOptions));
    });

    it('should retrieve a list of additions for a specific game when additions method is called', async () => {
      const gameId = 1;
      const expectedResponse = {
        count: 5,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Addition 1'
          },
          {
            id: 2,
            name: 'Addition 2'
          }
        ]
      };
      requestMock.mockResolvedValue(expectedResponse);

      const response = await games.additions(gameId);

      expect(response).toEqual(expectedResponse);
      expect(rawg.request).toHaveBeenCalledWith(`games/${gameId}/additions`);
    });

    it('should retrieve a list of development teams for a specific game when developmentTeam method is called', async () => {
      const gameId = 1;
      const expectedResponse = {
        count: 3,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            name: 'Team 1'
          },
          {
            id: 2,
            name: 'Team 2'
          }
        ]
      };
      requestMock.mockResolvedValue(expectedResponse);
      const response = await games.developmentTeam(gameId);

      expect(response).toEqual(expectedResponse);
      expect(rawg.request).toHaveBeenCalledWith(`games/${gameId}/development-team`);
    });
});
