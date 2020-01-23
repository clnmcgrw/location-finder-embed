/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from './components/Loader';
import ViewToggle from './components/ViewToggle';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import LoadMore, { LoadedAll } from './components/LoadMore';
import MapBox from './components/MapBox';
import { ListingSection, MapSection, ContentLiner, HeadingContent } from './components/Layout';
import { reverseGeocode, forwardGeocode, getResultsByProximity } from './lib/api-client';
import { getSearchResultsFromRows, searchTermFromGeodata, roundToDecimals } from './lib/utilities';
import { MAP_DEFAULTS, RESULT_DEFAULTS, COLORS } from './constants';


const App = ({ history, match, location }) => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allowGeolocate, setAllowGeolocate] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [viewPosition, setViewPosition] = useState(MAP_DEFAULTS.viewPosition);
  const [activeIndex, setActiveIndex] = useState(false);
  const [zoom, setZoom] = useState(MAP_DEFAULTS.zoom);
  const [error, setError] = useState(false);
  const page = useRef(1);
  const pageTotal = useRef(null);

  const getSearchResults = async (latitude, longitude) => {
    return getResultsByProximity(latitude, longitude).then(data => {
      console.log('Raw hubdb response: ', data);
      const results = getSearchResultsFromRows(data.objects);
      console.log('Search results: ', results);
      setSearchResults(results);
      pageTotal.current = Math.ceil(data.total / RESULT_DEFAULTS.limit);
    }).catch(error => {
      console.log('Request error: ', error);
      setError('Problem getting results.');
    }).finally(() => setLoading(false));
  };
  const getSearchTerm = async (latitude, longitude) => {
    return reverseGeocode(latitude, longitude).then(data => {
      const term = searchTermFromGeodata(data.features);
      console.log(term);
      setSearchTerm(term);
    }).catch(error => {
      console.log('Rev geocode err: ', error);
    });
  };

  // app mounted - get users location
  useEffect(() => {
    // linking to already performed search
    if (match.params.latitude && match.params.longitude) {
      const latitude = parseFloat(match.params.latitude);
      const longitude = parseFloat(match.params.longitude);
      setViewPosition({ latitude, longitude });
      (async () => {
        await getSearchResults(latitude, longitude);
        await getSearchTerm(latitude, longitude);
      })();
      return;

    // pre-filled search from url term param
    } else if (match.params.term && match.params.term.length > 1) {
      setSearchTerm(match.params.term);
      onSearchFormSubmit(match.params.term);
      return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
      const latitude = roundToDecimals(pos.coords.latitude);
      const longitude = roundToDecimals(pos.coords.longitude);
      console.log('Got coords: ', { latitude, longitude });
      setViewPosition({ latitude, longitude });

      history.push(`/search/${latitude}/${longitude}`);

      (async () => {
        await getSearchResults(latitude, longitude);
        await getSearchTerm(latitude, longitude);
      })();
    }, () => {
      setLoading(false);
      setAllowGeolocate(false);
    });
  }, []);

  // active index change 
  useEffect(() => {
    if (searchResults.length && activeIndex !== false) {
      const { lat: latitude, long: longitude } = searchResults[activeIndex].map_location;
      setViewPosition({ latitude, longitude });
    }
  }, [activeIndex]);

  // search submit callback -
  // called when no local errors exist in SearchForm
  // and when search term is in route when app mounts
  const onSearchFormSubmit = useCallback((forcedTerm = false) => {
    setLoading(true);
    if (!forcedTerm) {
      setSearchResults([]);
      setActiveIndex(false);
    }
    
    forwardGeocode(forcedTerm || searchTerm).then(data => {
      console.log('Forward geocode: ', data);
      const feature = data.features[0];
      if (feature) {
        const latitude = feature.geometry.coordinates[1];
        const longitude = feature.geometry.coordinates[0];
        setViewPosition({ latitude, longitude });

        history.push(`/search/${latitude}/${longitude}`);
        
        getResultsByProximity(latitude, longitude)
          .then(data => {
            console.log('Raw hubdb response: ', data);
            const results = getSearchResultsFromRows(data.objects);
            console.log('Search results: ', results);
            setSearchResults(results);
          })
          .catch(error => {
            console.log('Request error: ', error);
            setError('Problem getting results.');
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
        setError(`Can't find location for ${searchTerm}`);
      }
    }).catch(error => {
      setLoading(false);
      setError(`Can't find location for ${searchTerm}`);
      console.log('Forward geocode err: ', error);
    });
  }, [searchTerm, history]);

  // user initiated geolocation
  const geolocationClickHandler = useCallback(e => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(pos => {
      const latitude = roundToDecimals(pos.coords.latitude);
      const longitude = roundToDecimals(pos.coords.longitude);
      console.log('Got coords: ', { latitude, longitude });
      setViewPosition({ latitude, longitude });

      history.push(`/search/${latitude}/${longitude}`);

      (async () => {
        await getSearchResults(latitude, longitude);
        await getSearchTerm(latitude, longitude);
      })();
    }, () => {
      setLoading(false);
    });
  });

  // load more - gets results with offset
  const loadMoreClickHandler = useCallback(e => {
    e.preventDefault();
    setLoadingMore(true);
    const { latitude, longitude } = viewPosition;
    const offset = page.current * RESULT_DEFAULTS.limit;

    getResultsByProximity(latitude, longitude, offset)
      .then(data => {
        console.log('Raw hubdb response: ', data);
        const results = getSearchResultsFromRows(data.objects);
        console.log('Search results: ', results);
        page.current = page.current + 1;
        setSearchResults([...searchResults, ...results]);
      })
      .catch(error => {
        console.log('Request error: ', error);
        setError('Problem getting results.');
      })
      .finally(() => setLoadingMore(false));

  }, [searchResults]);
  
  return (
    <React.Fragment>
      <ListingSection>
        <ContentLiner>
          <HeadingContent />
          <SearchForm
           loading={loading}
           setLoading={setLoading}
           searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           showGeolocate={allowGeolocate}
           onGeolocate={geolocationClickHandler}
           onSubmit={onSearchFormSubmit} />
        </ContentLiner>
        <ContentLiner>
          <Loader loading={loading} error={error} height="320px" />
          {(searchResults.length > 0) &&
          <SearchResults 
           searchResults={searchResults} 
           activeIndex={activeIndex} 
           setActiveIndex={setActiveIndex} />}
          {page.current < pageTotal.current &&
          <LoadMore
           loading={loadingMore}
           onClick={loadMoreClickHandler} />}
          {page.current === pageTotal.current &&
          <LoadedAll>Showing All Locations</LoadedAll>}
        </ContentLiner>
      </ListingSection>
      <MapSection>
        <Loader loading={loading} error={error} background={COLORS.gray} />
        <MapBox 
         zoom={zoom}
         searchResults={searchResults}
         onZoomChange={zoom => setZoom(zoom)}
         viewPosition={viewPosition} 
         onViewPositionChange={pos => setViewPosition(pos)}
         activeIndex={activeIndex}
         onActiveIndexChange={index => setActiveIndex(index)} />
      </MapSection>
      <ViewToggle />
    </React.Fragment>
  );
};

export default withRouter(App);
