// Mock useNativeDriver
jest.mock('NativeAnimatedHelper');

jest.mock('react-native-router-flux', () => {
  return {
    Actions: {
      pop: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),
      refresh: jest.fn(),

      // Custom
      home: jest.fn(),
      search: jest.fn(),
    },
    ActionConst: {
      FOCUS: 'FOCUS',
    },
  };
});

jest.mock('react-native-code-push', () => {
  return {
    SyncStatus: {
      UP_TO_DATE: 0, // The running app is up-to-date
      UPDATE_INSTALLED: 1, // The app had an optional/mandatory update that was successfully downloaded and is about to be installed.
      UPDATE_IGNORED: 2, // The app had an optional update and the end-user chose to ignore it
      UNKNOWN_ERROR: 3,
      SYNC_IN_PROGRESS: 4, // There is an ongoing "sync" operation in progress.
      CHECKING_FOR_UPDATE: 5,
      AWAITING_USER_ACTION: 6,
      DOWNLOADING_PACKAGE: 7,
      INSTALLING_UPDATE: 8,
    },
  };
});
