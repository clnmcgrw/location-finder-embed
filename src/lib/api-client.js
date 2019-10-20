import { RESULT_DEFAULTS } from '../constants';
const { portalId, tableId, locationColumn, limit } = RESULT_DEFAULTS;

const hubDbBase = `https://api.hubapi.com/hubdb/api/v2/tables/${tableId}/rows?portalId=${portalId}`;
const mapBoxBase = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
const forwardGeocodeUrl = search => `${mapBoxBase}/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}&types=place,locality,postcode`;
const reverseGeocodeUrl = (lat, lng) => `${mapBoxBase}/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}&types=place,locality,postcode`;

const request = async (url, fetchOptions = {}) => {
  const response = await fetch(url, fetchOptions);
  if (response.ok) {
    const body = await response.json();
    return body;
  }
  throw new Error(response.status);
};


export const forwardGeocode = location => request(forwardGeocodeUrl(location));
export const reverseGeocode = (lat, lng) => request(reverseGeocodeUrl(lat, lng));

export const getResultsByProximity = async (latitude, longitude, offset = 0) => {
  return request(`${hubDbBase}&limit=${limit}&offset=${offset}&orderBy=geo_distance(${locationColumn},${latitude},${longitude})`);
};