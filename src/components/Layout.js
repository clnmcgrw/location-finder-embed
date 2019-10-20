import React from 'react';
import styled from 'styled-components';
import { COLORS, BREAKPOINTS, CONTENT_DEFAULTS } from '../constants';

// listing & results section
export const ListingSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding-bottom: 4rem;
  @media (min-width: ${BREAKPOINTS.large}) {
    width: 50%;
    z-index: 299;
    box-shadow: rgba(44,44,44,0.1) 2px 0 7px;
  }
`;
export const ContentLiner = styled.div`
  position: relative;
  padding: 5rem 2rem 2rem;
  min-height: ${props => props.results ? '400px' : '0'};
`;

// map embed parent
export const MapSection = styled.section`
  position: fixed;
  top: 0;
  left: -100%;
  background: ${COLORS.dark};
  width: 100%;
  height: 100%;
  @media (min-width: ${BREAKPOINTS.large}) {
    left: auto;
    right: 0;
    width: 50%;
  }
`;

// form headings
const Headings = styled.div`
  padding: 0 0 3rem;
  h2 {
    font-weight: bold;
    font-size: 2.8rem;
    margin: 0 0 1.2rem;
  }
  p {
    font-size: 1.1rem;
  }
`;
export const HeadingContent = () => (
  <Headings>
    <h2>{CONTENT_DEFAULTS.heading}</h2>
    <p>{CONTENT_DEFAULTS.subheading}</p>
  </Headings>
);