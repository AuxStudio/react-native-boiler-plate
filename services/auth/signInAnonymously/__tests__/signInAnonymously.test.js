import signInAnonymously from '../';
import { user } from '../../../../__mocks__/mockData';

it('resolves a promise and returns a user', async () => {
  expect.assertions(1);
  return signInAnonymously().then((response) =>
    expect(response).toEqual({
      user,
    }),
  );
});

// TODO: force an error
