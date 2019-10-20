import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { COLORS } from '../constants';

const rotateLoader = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }`;
const loaderAnimation = css`animation: ${rotateLoader} 0.45s linear infinite`;

const LoaderEl = styled.div`
  position: absolute;
  z-index: 599;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height || '100%'};
  background-color: ${props => props.background || COLORS.white};
  opacity: ${props => props.showing ? '1' : '0'};
  visibility: ${props => props.showing ? 'visible' : 'hidden'};
  transition: all 0.25s ease;
`;
const Indicator = styled.span`
  display: block;
  width: 1.75rem;
  height: 1.75rem;
  overflow: hidden;
  text-indent: -499px;
  border-radius: 50%;
  border-top: 3px solid rgba(10, 145, 145, 0.2);
  border-right: 3px solid rgba(10, 145, 145, 0.2);
  border-bottom: 3px solid rgba(10, 145, 145, 0.2);
  border-left: 3px solid ${COLORS.primary};
  ${loaderAnimation};
`;

const Loader = ({ loading, error, height, background }) => (
  <LoaderEl showing={loading && !error} height={height} background={background}>
    <Indicator>
      Loading...
    </Indicator>
  </LoaderEl>
);

Loader.defaultProps = {
  height: '100%',
  background: COLORS.white,
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  height: PropTypes.string,
  background: PropTypes.string,
};

export default Loader;
