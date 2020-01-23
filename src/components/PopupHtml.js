import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Address } from './ResultItem';
import { COLORS } from '../constants';


const Popup = styled.div`
  padding: 1.5rem;
  width: 300px;
  h3 {
    margin: 0 0 1rem;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  display: block;
  text-align: center;
  border-radius: 4px;
  font-size: 0.7rem;
  text-transform: uppercase;
  padding: 1rem 1.5em;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
  border: 2px solid ${COLORS.gray};
  color: ${COLORS.darkGray};
  transition: background 0.3s ease;
  &:hover { 
    background: ${COLORS.gray};
  }
`;

const PopupHtml = ({ result }) => {

  return (
    <Popup onClick={e => e.stopPropagation()}>
      <h3>{result.name}</h3>
      <Address result={result} />
      <ActionRow>
        <Button>Get Directions</Button>
      </ActionRow>
    </Popup>
  );
};

PopupHtml.propTypes = {
  result: PropTypes.object.isRequired,
};

export default PopupHtml;
