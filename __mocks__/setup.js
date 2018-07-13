// Mock useNativeDriver
jest.mock('NativeAnimatedHelper');

jest.mock('react-native-router-flux', () => {
  return {
    Actions: {
      pop: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),

      // Custom
      search: jest.fn(),
    },
    ActionConst: {
      FOCUS: 'FOCUS',
    },
  };
});
