import sendPasswordResetEmail from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: () => {
      return {
        sendPasswordResetEmail: jest.fn(() => {
          return new Promise((resolve) => {
            resolve();
          });
        }),
      };
    },
  };
});

describe('sendPasswordResetEmail', () => {
  it('resolves a promise if email was supplied', async () => {
    const email = 'shaun@aux.co.za';

    expect.assertions(1);
    const response = await sendPasswordResetEmail(email);
    expect(response).toBeUndefined();
  });

  it('rejects with error if the email is not supplied', async () => {
    try {
      const email = null;

      expect.assertions(1);
      await sendPasswordResetEmail(email);
    } catch (error) {
      expect(error).toEqual(new Error('Email is required'));
    }
  });
});
