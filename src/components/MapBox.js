/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMapGL, { FlyToInterpolator, NavigationControl, Marker, Popup, TRANSITION_EVENTS } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import PopupHtml from './PopupHtml';
import { COLORS, MAP_DEFAULTS } from '../constants';

const ControlWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: ${props => props.geo ? 'auto' : '5px'};
  left: ${props => props.geo ? '5px' : 'auto'};
`;
const MarkerHtml = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${COLORS.primary};
    border-radius: 50%;
    box-shadow: rgba(22, 22, 22, 0.15) 0 0 0 8px;
    transition: opacity 0.2s ease;
  }
  > span {
    position: relative;
    z-index: 99;
    display: block;
    line-height: 2;
    color: ${COLORS.light};
    font-weight: bold;
    font-size: 0.75rem;
    text-align: center;
  }
`;

const MapBox = ({
  viewPosition, 
  onViewPositionChange,
  zoom,
  onZoomChange,
  searchResults,
  activeIndex,
  onActiveIndexChange,
}) => {

  const dragging = useRef(null);
  const transitionDur = useRef(0);
  const transitionFlyTo = useRef(null);

  const onViewportChange = data => {
    console.log('Viewport change: ', data);
    const { latitude, longitude, zoom } = data;
    
    onViewPositionChange({ latitude, longitude });
    onZoomChange(zoom);

    // if (!dragging.current) {
    //   transitionDur.current = 500;
    //   transitionFlyTo.current = new FlyToInterpolator();
    // } else if (transitionDur.current > 0) {
    //   transitionDur.current = 0;
    //   transitionFlyTo.current = null;
    // }
  };

  const onCursorState = state => {
    dragging.current = state.isDragging;
  };

  return (
    <ReactMapGL
     width="100%"
     height="100%"
     zoom={zoom}
     maxZoom={MAP_DEFAULTS.maxZoom}
     minZoom={MAP_DEFAULTS.minZoom}
     scrollZoom={MAP_DEFAULTS.scrollZoom}
     latitude={viewPosition.latitude}
     longitude={viewPosition.longitude}
     onViewportChange={onViewportChange}
     getCursor={onCursorState}
     transitionDuration={transitionDur.current}
     transitionInterpolator={transitionFlyTo.current}
     mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}>
      
      <ControlWrapper>
        <NavigationControl showCompass={false} />
      </ControlWrapper>

      {(searchResults.length > 0) && searchResults.map((result, i) =>
      <React.Fragment key={`marker-${i}`}>
        <Marker
         latitude={result.map_location.lat} 
         longitude={result.map_location.long}
         offsetLeft={-12}
         offsetTop={5}>
          <MarkerHtml 
            active={activeIndex === i}
            onClick={() => onActiveIndexChange(i)}>
            <div></div>
            <span>{i + 1}</span>
          </MarkerHtml>
        </Marker>
        {activeIndex === i &&
        <Popup
         latitude={result.map_location.lat}
         longitude={result.map_location.long}
         closeOnClick={false}
         captureClick={true}
         onClose={() => onActiveIndexChange(false)}>
           <PopupHtml result={result} />
        </Popup>}
      </React.Fragment>)}

    </ReactMapGL>
  );
};

MapBox.defaultProps = {
  markers: [],
  activeIndex: false,
};

MapBox.propTypes = {
  zoom: PropTypes.number.isRequired,
  viewPosition: PropTypes.object.isRequired,
  searchResults: PropTypes.array,
  activeIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default MapBox;
