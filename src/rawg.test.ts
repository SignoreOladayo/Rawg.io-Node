import Rawg from ".";
import { AuthException } from "./common/exceptions/authException";
import { NotFoundException } from "./common/exceptions/notFoundException";
import { RateLimitException } from "./common/exceptions/rateLimitException";

describe("Rawg", () => {
  let status: number;
  const fetchMock = jest.fn(() => Promise.resolve({
    status,
    json: () => Promise.resolve(null)
  })) as jest.Mock;

  afterEach(() => jest.restoreAllMocks());

  it("should throw AuthException", async () => {
    status = 401;
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock); 
    const rawg = new Rawg('INVALID_API_KEY');
    await expect(rawg.request("games")).rejects.toThrow(AuthException)
  });

  it("should throw NotFoundException", async () => {
    status = 404;
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock); 
    const rawg = new Rawg('VALID_API_KEY');
    await expect(rawg.request("games")).rejects.toThrow(NotFoundException)
  });

  it("should throw RateLimitException", async () => {
    status = 429;
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock); 
    const rawg = new Rawg('VALID_API_KEY');
    await expect(rawg.request("games")).rejects.toThrow(RateLimitException)
  });

});
