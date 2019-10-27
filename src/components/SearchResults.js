/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { ArrowIcon, Address, Phone } from './ResultItem';
import { RESULT_DEFAULTS, COLORS, EASING } from '../constants';

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
  padding: 2rem 1.5rem 1.5rem;
  padding-left: 2.5rem;
  transform: ${props => props.active ? 'translateX(1rem)' : 'translateX(0)'};
  transition: transform 0.35s ${EASING.outCirc}, opacity 0.3s linear;
  h3 {
    font-size: 1.1rem;
    margin: 0 0 0.75rem;
    > span {
      display: inline-block;
      position: relative;
      padding-right: 1.5rem;
    }
  }
  + span {
    opacity: ${props => props.active ? '1' : '1'};
    transform: ${props => props.active ? 'translateX(0)' : 'translateX(0)'};
  }
`;

const Number = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 1.5rem;
  left: 0.5rem;
  padding-top: 0.35rem;
  font-size: 0.9rem;
  color: ${COLORS.secondary};
`;


const getNumberDisplay = index => {
  const count = index + 1;
  return count > 9 ? count : `0${count}`;
};

const SearchResults = ({
  searchResults,
  activeIndex,
  setActiveIndex,
  match 
}) => {

  useEffect(() => {
    if (!match.params.index) return;
    const index = parseInt(match.params.index);
    if (index !== activeIndex && index < RESULT_DEFAULTS.limit) {
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
        <Number>{getNumberDisplay(index)}</Number>
        <Link to={getLinkTo(index)}>View Store on Map</Link>
        <ResultsItem active={activeIndex === index}>
          <h3>
            <span>{result.name} <ArrowIcon active={activeIndex === index} /></span>
          </h3>
          <Address result={result} />
          {RESULT_DEFAULTS.showPhone &&
          <Phone>{result.phone}</Phone>}
        </ResultsItem>
      </li>)}
    </ResultsList>
  );
};

export default withRouter(SearchResults);
