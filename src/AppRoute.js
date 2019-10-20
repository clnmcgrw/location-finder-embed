import React from 'react'
import { Route } from 'react-router-dom';
import App from './App';

const AppRoute = () => (
  <Route exact path={[
    '/', // geolocation denial / default empty results
    '/search/:term', // linking to a pre-filled search field
    '/search/:latitude/:longitude', // geolocation ok or forward geocoded 
    '/search/:latitude/:longitude/:index' // link to a store within a search
  ]} component={App} />
);

export default AppRoute;
