import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from './Loader';
import { COLORS } from '../constants';

const WrapperEl = styled.div`
  position: relative;
  overflow: hidden;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    display: inline-block;
    border: none;
    outline: none;
    appearance: none;
    padding: 1rem 2rem;
    text-align: center;
    background: none;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    transition: color 0.3s ease, background 0.3s ease;
    &:hover {
      background: ${COLORS.light};
      color: ${COLORS.primary};
    }
    &:active {
      transform: translateY(1px);
    }
  }
`;

export const LoadedAll = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${COLORS.darkGray};
`;

const LoadMore = ({ loading, onClick }) => (
  <WrapperEl>
    <Loader loading={loading} error={false} />
    <button type="button" onClick={onClick}>
      <span>Load More</span>
    </button>
  </WrapperEl>
);

LoadMore.defaultProps = {
  loading: false,
};

LoadMore.propTypes = {
  loading: PropTypes.bool,
};

export default LoadMore;
