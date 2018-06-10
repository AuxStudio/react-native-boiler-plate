import { database, user } from './mockData';

// Mock the bejeesus out of react-native-firebase for our unit tests
export default {
  analytics: jest.fn(() => {
    return {
      log: jest.fn(() => Promise.resolve()),
    };
  }),
  auth: () => ({
    signInAnonymouslyAndRetrieveData: jest.fn(() => Promise.resolve(user)),
  }),
  database: () => ({
    ref: (ref) => ({
      once: jest.fn(() =>
        Promise.resolve({
          val: jest.fn(() => {
            return database[ref];
          }),
        }),
      ),
    }),
  }),
};
