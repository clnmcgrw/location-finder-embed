import { RESULT_KEYS_MAP } from '../constants';

// re-format search results w/ real key names
export const getSearchResultsFromRows = (rows) => rows.map(row => {
  let result = { id: row.id };
  Object.keys(row.values).forEach(key => {
    const newKey = RESULT_KEYS_MAP[key];
    result[newKey] = row.values[key];
  });
  return result;
});

// get autofilled searchterm after geolocation
export const searchTermFromGeodata = geodata => {
  const [itemMatch] = geodata.filter(item => {
    return item.place_type.includes('place');
  });
  return itemMatch ? itemMatch.place_name.replace(', United States', '') : '';
};

// round to 'x' number of decimal places
export const roundToDecimals = (value, decimals = 5) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);
