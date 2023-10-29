import Creators from "./resources/Creators";
import Developers from "./resources/Developers";
import Games from "./resources/Games";
import Genre from "./resources/Genres";
import Platform from "./resources/Platforms";
import Publishers from "./resources/Publishers";
import Store from "./resources/Store";
import Tag from "./resources/Tags";
import { AuthException } from "./common/exceptions/authException";
import { NotFoundException } from "./common/exceptions/notFoundException";
import { RateLimitException } from "./common/exceptions/rateLimitException";

class Rawg {
    private apiKey: string;

    readonly games =  new Games(this);
    readonly creators = new Creators(this);
    readonly developers = new Developers(this);
    readonly genres = new  Genre(this);
    readonly platforms = new Platform(this);
    readonly publishers = new Publishers(this);
    readonly stores = new Store(this);
    readonly tags = new Tag(this);

    constructor(RAWG_API_KEY: string, private baseUrl = 'https://api.rawg.io/api'){
        this.apiKey = RAWG_API_KEY;
    }

    async request<T>(resource: string, params?: Record<string, string>): Promise<T> {
        const searchParams = new URLSearchParams({...params, key: this.apiKey});
        const reqUrl = `${this.baseUrl}/${resource}?${searchParams}`;

        try {
            const res = await fetch(reqUrl);
            console.log('res is =', res)
            if (res.status !== 200) {
                this.handleInvalidResponse(res);
            }
            return await res.json();
        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Something went wrong');
            }
            throw error;
        }
    }
    handleInvalidResponse(res: Response) {
        switch (res.status) {
            case 404:
                throw new NotFoundException();
            case 401:
                throw new AuthException();
            case 429:
                throw new RateLimitException();
            default:
                throw new Error('Something went wrong')
        }
    }
 }

export default Rawg;



const test = async () => {
    const r = new Rawg('');
    const res = await r.games.details(4544);
    console.log(res)
};

// test();
