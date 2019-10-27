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
  width: 48%;
  text-align: center;
  border-radius: 4px;
  font-size: 0.7rem;
  text-transform: uppercase;
  padding: 1rem 0.5em;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
  border: 1px solid ${COLORS.darkGray};
  color: ${COLORS.darkGray};
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
        <Button>Store Hours</Button>
      </ActionRow>
    </Popup>
  );
};

PopupHtml.propTypes = {
  result: PropTypes.object.isRequired,
};

export default PopupHtml;
