import getData from '../';
import { database } from '../../../../__mocks__/mockData';

it('resolves a promise and returns data if ref has data', async () => {
  expect.assertions(1);
  const ref = 'foo';
  return getData(ref).then((response) => expect(response).toEqual({ data: database[ref] }));
});

it('resolves a promise and returns undefined if ref has no data', async () => {
  expect.assertions(1);
  const ref = 'noData';
  return getData(ref).then((response) => expect(response).toBeUndefined());
});
