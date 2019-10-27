import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const ButtonEl = styled.button`
  border: none;
  appearance: none;
  cursor: pointer;
  display: inline-block;
  padding: 1rem 2rem;
  line-height: 1;
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 6px;
  background: ${COLORS.primary};
  color: ${COLORS.light};
  &[disabled] {
    background: ${COLORS.light};
    color: ${COLORS.darkGray};
    cursor: wait;
  }
`

const Button = props => {

  return (
    <ButtonEl {...props}>
      {props.children}
    </ButtonEl>
  );
};


export default Button;