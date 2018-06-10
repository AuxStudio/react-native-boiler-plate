// creates an Error instance from an error if it is not one already
const createError = (error) => {
  return error instanceof Error ? error : new Error(error);
};

export default createError;
