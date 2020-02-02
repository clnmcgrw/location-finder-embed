
const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const formatTime = timeStr =>  {
  const timeParts = timeStr.split(':');
  const hours = timeParts[0];
  if (!hours) return false;

  const hourInt = parseInt(hours);
  const suffix = hourInt > 12 ? 'PM' : 'AM';
  if (hourInt > 12) {
    return `${hourInt - 12}:${timeParts[1]}${suffix}`;
  }
  return timeStr + suffix;
};

const getHoursFromRow = row => {
  let result = '<ul>';
  daysOfWeek.forEach(day => {
    const open = row[`${day}open`];
    const close = row[`${day}close`];
    if (open.length && close.length)
      result += `<li>${day}: ${formatTime(open)} - ${formatTime(close)}</li>`;
  });
  return result += '</ul>';
};

const getLocationFromRow = row => ({
  type: 'location',
  lat: parseFloat(row.latitude),
  long: parseFloat(row.longitude),
});


module.exports = {
  getHoursFromRow,
  getLocationFromRow,
};