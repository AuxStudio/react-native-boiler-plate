/*
  Takes a unix timestamp and returns a pretty date in the formats:

  - Sat, 3 Feb (timestamp)
  - Saturday, 3 February (timestamp, false, true)
  - Sat, 3 Feb 2018 (timestamp, true, false)
*/
const getPrettyDate = (timestamp, showYear, abbreviate) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(timestamp);
  let dayText = days[date.getDay()];
  let monthText = months[date.getMonth()];
  const yearText = showYear ? ` ${date.getFullYear()}` : '';

  if (abbreviate) {
    dayText = dayText.slice(0, 3);
    monthText = monthText.slice(0, 3);
  }

  return `${dayText}, ${date.getDate()} ${monthText}${yearText}`;
};

export default getPrettyDate;
