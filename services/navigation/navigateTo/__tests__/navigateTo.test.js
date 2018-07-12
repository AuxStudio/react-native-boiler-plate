import navigateTo from '..';

jest.mock('react-native-router-flux', () => {
  return {
    Actions: {
      test: jest.fn(),
      reset: jest.fn(),
      replace: jest.fn(),
    },
  };
});

describe('navigateTo', () => {
  it('resolves a promise when passed a page', async () => {
    expect.assertions(1);
    const response = await navigateTo('test', { foo: 'bar' });
    expect(response).toEqual();
  });

  it('resolves a promise when passed shouldReset', async () => {
    expect.assertions(1);
    const response = await navigateTo('test', { foo: 'bar' }, true);
    expect(response).toEqual();
  });

  it('resolves a promise when passed shouldReplace', async () => {
    expect.assertions(1);
    const response = await navigateTo('test', { foo: 'bar' }, false, true);
    expect(response).toEqual();
  });
});
