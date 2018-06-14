// Takes a unix timestamp and returns a pretty date in the format: Sat, 3 Feb
const getPrettyDate = (timestamp) => {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(timestamp);

  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
};

export default getPrettyDate;
