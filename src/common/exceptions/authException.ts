export class AuthException extends Error {
    readonly status = 401;
    readonly name = 'AuthException';
    readonly message = 'Please check that a valid API key is passed to Rawg instance. e.g new Rawg("valid_api_key")';
}
