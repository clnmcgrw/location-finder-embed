// support gsheet or hubdb as data source
export const DATA_SOURCE = 'gsheets'; // OR 'hubdb'

export const GSHEET_SETTINGS = {
  SCOPES: '',
  DISCOVERY_DOCS: [''],
  LOCATIONS_SHEET_ID: '1ELP2bRhfDs7QKHhdnnzVbH_7Q1R7LBjwYGqRJFhZvfg',
  
};


// -router paths
// user loads page - geolocation attempt
// denied - then go to '/'
// accept - then go to '/search/lat/lng
//
export const ROUTE_CONFIG = [
  '/', 
  '/search/:term', // linking to a pre-filled search field
  '/search/:latitude/:longitude/:index' // link to a store within a search
];

// Everything past this point can be overridden -
// by providing a config property w/ the same name
const userConfig = window.__lfeConfig || {};
const getConfig = prop => userConfig[prop] || {};

// content settings
export const CONTENT_DEFAULTS = {
  heading: 'Locate a Koi CBD Distributor Near You',
  subheading: 'Search below by city, state, zip to find the nearest distributor.',
  ...getConfig('CONTENT_DEFAULTS'),
};

// map settings
export const MAP_DEFAULTS = {
  viewPosition: {
    latitude: 37.7577,
    longitude: -122.4376,
  },
  zoom: 11,
  maxZoom: 18,
  minZoom: 2,
  scrollZoom: false,
  ...getConfig('MAP_DEFAULTS'),
};

// results listing settings
export const RESULT_DEFAULTS = {
  locationColumn: 'map_location',
  portalId: '5273025',
  tableId: process.env.REACT_APP_HS_HUBDB_TABLE_ID,
  limit: 15,
  absoluteLimit: 100,
  showPhone: true,
  ...getConfig('RESULT_DEFAULTS'),
};

// map a row's value keys to meaningful names
export const RESULT_KEYS_MAP = {
  '1': 'name',
  '3': 'map_location',
  '4': 'hours',
  '6': 'country',
  '7': 'email',
  '8': 'phone',
  '9': 'address_1',
  '10': 'address_2',
  '11': 'address_3',
  '12': 'address_4',
  '13': 'type',
  '14': 'city',
  '15': 'state',
  '16': 'zipcode',
  '17': 'website',
};

// style settings
export const COLORS = {
  primary: '#f4b13e',
  secondary: '#c0d8be',
  error: '#d44646',
  dark: '#444444',
  light: '#f5f5f5',
  white: '#ffffff',
  gray: '#eeeeee',
  darkGray: '#a5a5a5',
  overlay: 'rgba(33,33,33,0.9)',
};
export const BREAKPOINTS = {
  small: '540px',
  medium: '767px',
  large: '992px',
  xlarge: '1199px',
  xxlarge: '1440px',
};
export const EASING = {
  outCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
};