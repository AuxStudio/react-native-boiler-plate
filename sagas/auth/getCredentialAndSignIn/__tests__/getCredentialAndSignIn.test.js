import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import getCredentialAndSignIn from '..';

const auth = {
  getCredentialAndSignIn: jest.fn(),
  getCredentialFromFacebook: jest.fn(),
  getCredentialFromGoogle: jest.fn(),
  signInWithCredential: jest.fn(),
  getCredentialFromEmail: jest.fn(),
};

const action = {
  type: 'getCredentialAndSignIn',
  payload: {
    provider: 'Facebook',
  },
};

const googleAction = {
  type: 'getCredentialAndSignIn',
  payload: {
    provider: 'Google',
  },
};

const emailAction = {
  type: 'getCredentialAndSignIn',
  payload: {
    provider: 'Email',
    email: 'shaun@aux.co.za',
    password: '123123',
  },
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { nextAction } };

const providerResponse = { credential: 'bar' };
const signInResponse = { user: true };

describe('getCredentialAndSignIn saga', () => {
  describe('When testing the saga without a nextAction and with a response from the Facebook provider api', () => {
    const it = sagaHelper(getCredentialAndSignIn(action));

    it('should have called the mocked provider API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getCredentialFromFacebook)));

      return providerResponse;
    });

    it('should have called the mocked credential API next with the provider API response as args', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(auth.signInWithCredential, providerResponse.credential)),
      );

      return signInResponse;
    });

    it('and then trigger the SIGN_IN_USER action', (result) => {
      expect(result).toEqual(put({ type: 'SIGN_IN_USER', payload: signInResponse }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga with a nextAction and with a response from the Facebook provider api', () => {
    const it = sagaHelper(getCredentialAndSignIn(actionWithNextAction));

    it('should have called the mocked provider API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getCredentialFromFacebook)));

      return providerResponse;
    });

    it('should have called the mocked credential API next with the provider API response as args', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(auth.signInWithCredential, providerResponse.credential)),
      );

      return signInResponse;
    });

    it('and then trigger the next action', (result) => {
      expect(result).toEqual(put({ ...nextAction, payload: signInResponse }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga when an error is thrown from the provider api', () => {
    const it = sagaHelper(getCredentialAndSignIn(action));
    const errorMessage = 'Something went wrong';

    it('should have called the mocked provider API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getCredentialFromFacebook)));

      return new Error(errorMessage);
    });

    it('and then trigger an error action with the error message', (result) => {
      expect(result).toEqual(
        put({
          type: 'logError',
          payload: {
            error: utils.app.createError(errorMessage),
            date: expect.any(Date),
            action,
          },
        }),
      );
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga when an error is thrown from the signIn api', () => {
    const it = sagaHelper(getCredentialAndSignIn(action));
    const errorMessage = 'Something went wrong';

    it('should have called the mocked provider API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getCredentialFromFacebook)));

      return providerResponse;
    });

    it('should have called the mocked credential API next with the provider API response as args', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(auth.signInWithCredential, providerResponse.credential)),
      );

      return new Error(errorMessage);
    });

    it('and then trigger an error action with the error message', (result) => {
      expect(result).toEqual(
        put({
          type: 'logError',
          payload: expect.objectContaining({
            error: utils.app.createError(errorMessage),
            action,
          }),
        }),
      );
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  // Here we only need to test that the provider correlates to the correct saga
  describe('When testing the saga without a nextAction and with a response from the Google provider api', () => {
    const it = sagaHelper(getCredentialAndSignIn(googleAction));

    it('should have called the mocked provider API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getCredentialFromGoogle)));

      return providerResponse;
    });

    it('should have called the mocked credential API next with the provider API response as args', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(auth.signInWithCredential, providerResponse.credential)),
      );

      return signInResponse;
    });

    it('and then trigger the SIGN_IN_USER action', (result) => {
      expect(result).toEqual(put({ type: 'SIGN_IN_USER', payload: signInResponse }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  // Here we only need to test that the provider correlates to the correct saga
  describe('When testing the saga without a nextAction and with a response from the Email provider api', () => {
    const it = sagaHelper(getCredentialAndSignIn(emailAction));

    it('should have called the mocked provider API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(
          call(
            auth.getCredentialFromEmail,
            emailAction.payload.email,
            emailAction.payload.password,
          ),
        ),
      );

      return providerResponse;
    });

    it('should have called the mocked credential API next with the provider API response as args', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(auth.signInWithCredential, providerResponse.credential)),
      );

      return signInResponse;
    });

    it('and then trigger the SIGN_IN_USER action', (result) => {
      expect(result).toEqual(put({ type: 'SIGN_IN_USER', payload: signInResponse }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
