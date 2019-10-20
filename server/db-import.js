require('dotenv').config();
const debug = require('debug')('import:main');
const fs = require('fs');
const util = require('util');
const parse = require('csv-parse');
const readFile = util.promisify(fs.readFile);
const parseCsv = util.promisify(parse);
const hubdb = require('./hubdb-client');

const tableId = process.env.REACT_APP_HS_HUBDB_TABLE_ID;
const dataPath = `${__dirname}/_data/`;


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

const getHoursFromCsvRow = row => {
  let result = '<ul>';
  daysOfWeek.forEach(day => {
    const open = row[`${day}Open`];
    const close = row[`${day}Close`];
    if (open.length && close.length)
      result += `<li>${day}: ${formatTime(open)} - ${formatTime(close)}</li>`;
  });
  return result += '</ul>';
};


(async () => {
  const csvData = await readFile(`${dataPath}koi-locations-export.csv`, 'utf8');
  const jsonData = await parseCsv(csvData, { columns: true });
  debug(`${jsonData.length} records found in CSV file`);

  debug('Example csv record: ', jsonData[1]);

  // row by row
  for (let i=0; i < jsonData.length; i++) {
    const record = jsonData[i];
    const hoursHtml = getHoursFromCsvRow(record);

    const locationObj = {
      type: 'location',
      lat: parseFloat(record.Latitude),
      long: parseFloat(record.Longitude),
    };
    const newRowBody = {
      '1': record.LocationName,
      '2': record.LOCATIONID,
      '3': locationObj,
      '4': hoursHtml,
      '5': record['Active?'].toLowerCase() === 'yes' ? 1 : 0,
      '6': record.Country,
      '7': record.ContactEmail,
      '8': record.ContactPhone || record.ContactMobile,
      '9': record.Address1,
      '10': record.Address2,
      '11': record.Address3,
      '12': record.Address4,
      '13': record.LocationType,
      '14': record.City,
      '15': record.State_Province,
      '16': record.Zip_PostalCode,
      '17': record.URL,
    };

    try {
      const addedRow = await hubdb.addTableRow(tableId, newRowBody); 
      debug('Added record to HubDB ', i + ' '  + addedRow.values['1']);
    } catch (e) {
      debug('Error adding record to HubDB: ', e);
    }
  }
})();