import getData from '../';
import { database } from '../../../../__mocks__/mockData';

it('resolves a promise and returns data', async () => {
  expect.assertions(1);
  return getData().then((response) => expect(response).toEqual({ data: database }));
});

// TODO: force an error
