import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const AddressHtml = styled.address`
  font-style: normal;
  line-height: 1.2;
  color: ${COLORS.darkGray};
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
  .lfe-street-addr {
    span {
      display: inline-block;
      &:first-of-type {
        margin-right: 5px;
      }
    }
  }
`;
export const Address = ({ result }) => (
  <AddressHtml>
    <div className="lfe-street-addr">
      <span>{result.address_1}</span>
      {(result.address_2 && result.address_2.length > 0) &&
      <span>{result.address_2}</span>}
    </div>
    {(result.address_3 && result.address_3.length > 0) &&
      <small>{result.address_3}</small>}
    <div className="lfe-city-state">
      <span>{result.city}, {result.state} {result.zipcode}</span>
    </div>
  </AddressHtml>
);


const ArrowElement = styled.div`
  display: block;
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 0;
  right: 0;
  color: ${props => props.active ? COLORS.primary : COLORS.dark};
  transform: ${props => props.active ? `translateX(5px)` : `translateX(-15px)`};
  opacity: ${props => props.active ? `1` : `0`};
  transition: all 0.3s ease;
  svg {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export const ArrowIcon  = ({ active }) => (
  <ArrowElement active={active}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  </ArrowElement>
);


export const Phone = styled.div`
  font-weight: bold;
  font-size: 0.85rem;
  color: ${COLORS.primary};
  margin: -0.5rem 0 0.5rem;
`;


const HoursElement = styled.div`
`;

const HoursDrawer = styled.div`
  height: ${props => props.showing ? `auto` : `0px`};
  overflow: hidden;

  ul {
    padding: 0.5rem 0 0;
    margin: 0;
    border: none;
    font-size: 0.9rem;
    color: ${COLORS.darkGray};

    li, li:last-child {
      border: none;
    }
  }
`;

const ShowHoursBtn = styled.button`
  border: none;
  outline: none;
  appearance: none;
  padding: 0;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${COLORS.primary};
  cursor: pointer;
`;

export const Hours = ({content}) => {
  const [showing, setShowing] = useState(false);
  const showHours = e => {
    e.preventDefault();
    setShowing(!showing);
  };
  return (
    <HoursElement>
      <ShowHoursBtn type="button" onClick={showHours}>
        <span>{showing ? 'Hide' : 'Show'} Hours</span>
      </ShowHoursBtn>
      <HoursDrawer showing={showing}>
        <div dangerouslySetInnerHTML={{__html: content}}>
        </div>
      </HoursDrawer>
    </HoursElement>
  );
};