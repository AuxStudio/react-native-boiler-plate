// Takes a timestamp and returns the amount of hours that have passed, to the nearest hour
const getHours = (timestamp) => {
  if (timestamp) {
    const now = Date.now();
    const difference = now - timestamp;
    const hours = Math.round(difference / 1000 / 60 / 60); // / ms / s / min
    return hours;
  }
  return 0;
};

export default getHours;
