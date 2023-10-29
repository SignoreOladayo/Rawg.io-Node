import Rawg from ".";
import { DeveloperSchema } from "./resources/Developers/schema";

describe('Endpoint validation', () => {
    let rawg: Rawg;
    beforeAll(() => {
        rawg = new Rawg('');
    })
    describe('Developers', () =>{
        it('list', async () => {
            const developerList = await rawg.request(`developers`);
            expect(DeveloperSchema.parse(developerList)).toBeTruthy;
          });
        it('details', async () => {
            const developerDetails = await rawg.request(`developers/321`);
            expect(DeveloperSchema.parse(developerDetails)).toBeTruthy;
          });
        });
  })