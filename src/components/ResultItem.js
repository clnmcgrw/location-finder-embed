import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const AddressHtml = styled.address`
  font-style: normal;
  line-height: 1.2;
  color: ${COLORS.darkGray};
  margin: 0 0 0.5rem;
  span {
    display: block;
  }
`;

export const Address = ({ result }) => (
  <AddressHtml>
    <span>{result.street_address}</span>
    <span>{result.city}, {result.state} {result.zipcode}</span>
  </AddressHtml>
);


export const Phone = styled.div`
  font-weight: bold;
  color: ${COLORS.primary};
`;
