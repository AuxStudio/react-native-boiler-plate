import { put } from 'redux-saga/effects';

const onError = (error) => {
  const { message } = error;

  return put({
    type: 'SET_SYSTEM_MESSAGE',
    payload: {
      systemMessage: {
        message,
        variant: 'error',
      },
    },
  });
};

export default onError;
