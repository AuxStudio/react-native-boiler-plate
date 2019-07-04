import strings from '../../strings';

// Takes a timestamp and returns the time in the format: 13:00
const getTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${strings.addZeroPadding(date.getHours())}:${strings.addZeroPadding(date.getMinutes())}`;
};

export default getTime;
