const debug = require('debug')('sheet:sync');
const GoogleSheet = require('google-spreadsheet');
const hubdb = require('./hubdb-client');
const { getHoursFromRow, getLocationFromRow } = require('./utilities.js');

const hubdbTableId = '2054297';
const locationsSheetId = '1ELP2bRhfDs7QKHhdnnzVbH_7Q1R7LBjwYGqRJFhZvfg';

const getLocationsFromSheet = (id = locationsSheetId) => {
  const doc = new GoogleSheet(id);

  return new Promise((resolve, reject) => {
    doc.getInfo((err, info) => {
      const sheet = info.worksheets[0];
      sheet.getRows((err, rows) => {
        resolve(rows);
      });
    });
  });
};


(async () => {
  const rows = await getLocationsFromSheet();

  rows.forEach(row => {
    const hours = getHoursFromRow(row);
    const location = getLocationFromRow(row);
    debug('Row: ', row);
    
    const rowObject = {
      '1': row.locationname,
      '2': row.locationid,
      '3': location,
      '4': hours,
      '5': row.active.toLowerCase() === 'yes' ? 1 : 0,
      '6': row.country,
      '7': row.contactemail,
      '8': row.contactphone || row.contactmobile,
      '9': row.address1,
      '10': row.address2,
      '11': row.address3,
      '12': row.address4,
      '13': row.locationtype,
      '14': row.city,
      '15': row.stateprovince,
      '16': row.zippostalcode,
      '17': row.url,
    };

    (async () => {

    })();

  });

})();



