import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../constants';

const TabParent = styled.aside`
  position: fixed;
  z-index: 10001;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  background: ${COLORS.white};
  box-shadow: rgba(44,44,44,0.1) 0 -2px 7px;
  > span {
    display: block;
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: 50%;
    margin-left: -1px;
    background: ${COLORS.gray};
  }
  button {
    border: none;
    outline: none;
    font-size: 0.9rem;
    display: block;
    flex-basis: 50%;
    padding: 1.5rem 0.5rem;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

const ViewToggle = ({ onMapClick, onListClick }) => {

  return (
    <TabParent>
      <span></span>
      <button type="button" onClick={onListClick}>
        <span>List View</span>
      </button>
      <button type="button" onClick={onMapClick}>
        <span>Map View</span>
      </button>
    </TabParent>
  );
};

ViewToggle.defaultProps = {
  onMapClick: () => {},
  onListClick: () => {},
};

ViewToggle.propTypes = {
  onMapClick: PropTypes.func,
  onListClick: PropTypes.func,
};

export default ViewToggle;
