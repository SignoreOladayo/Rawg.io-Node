import Rawg from ".";
import { DeveloperSchema } from "./resources/Developers/schema";

describe('Endpoint validation', () => {
    let rawg: Rawg;
    beforeAll(() => {
        rawg = new Rawg('8db26189718f4fe59807d6fbb51a10c2');
    })
    describe('Developers', () =>{
        it('details', async () => {
            const developerDetails = await rawg.request(`developers/321`);
            expect(DeveloperSchema.parse(developerDetails)).toBeTruthy;
          });
        });
  })