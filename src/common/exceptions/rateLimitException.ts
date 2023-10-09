export class RateLimitException extends Error {
    readonly status = 429;
    readonly name = "RateLimitException";
    readonly message = "Too many requests.";
}