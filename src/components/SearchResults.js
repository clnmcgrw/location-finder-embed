/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Address, Phone } from './ResultItem';
import { COLORS, EASING } from '../constants';

const ResultsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    position: relative;
    display: block;
    border-top: 2px solid ${COLORS.gray};
    &:last-child {
      border-bottom: 2px solid ${COLORS.gray};
    }
    a {
      display: block;
      position: absolute;
      overflow: hidden;
      text-indent: -499px;
      z-index: 9;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;
const ResultsItem = styled.div`
  padding: 1.5rem 0 1.5em 1.5em;
  transform: ${props => props.active ? 'translateX(1.5rem)' : 'translateX(0)'};
  transition: transform 0.35s ${EASING.outCirc}, opacity 0.3s linear;
  h3 {
    margin: 0 0 1rem;
  }
  + span {
    opacity: ${props => props.active ? '1' : '0'};
    transform: ${props => props.active ? 'translateX(0)' : 'translateX(-3rem)'};
  }
`;

const ArrowIcon = styled.span`
  display: block;
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 2.2rem;
  left: 1rem;
  margin-top: -0.5rem;
  color: ${COLORS.primary};
  transition: transform 0.35s ${EASING.outCirc}, opacity 0.35s ease;
  svg {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;


const SearchResults = ({
  searchResults,
  activeIndex,
  setActiveIndex,
  match 
}) => {

  useEffect(() => {
    console.log('From results list: ', match);
  }, []);

  useEffect(() => {
    if (!match.params.index) return;
    const index = parseInt(match.params.index);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [match]);

  const getLinkTo = useCallback(index => {
    return `/search/${match.params.latitude}/${match.params.longitude}/${index}`;
  }, [match.params]);

  return (
    <ResultsList>
      {searchResults.map((result, index) => 
      <li key={result.id}>
        <Link to={getLinkTo(index)}>View Store on Map</Link>
        <ResultsItem active={activeIndex === index}>
          <h3>{result.name}</h3>
          <Address result={result} />
          <Phone>{result.phone}</Phone>
        </ResultsItem>
        <ArrowIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </ArrowIcon>
      </li>)}
    </ResultsList>
  );
};

export default withRouter(SearchResults);
