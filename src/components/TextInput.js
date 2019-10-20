import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../constants';


const InputWrapper = styled.div`
  position: relative;
  flex-grow: 2;
  margin-right: 1rem;
  label {
    display: block;
    position: absolute;
    pointer-events: none;
    font-size: 1.2rem;
    top: 0.9rem;
    left: 1.2rem;
    background: ${COLORS.white};
    transform-origin: left top;
    color: ${COLORS.darkGray};
    transform: ${props => props.hasValue ? 'translateY(-1.5rem) scale(0.7)' : 'none'};
  }`;

const Input = styled.input`
  outline: none;
  appearance: none;
  display: block;
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 6px;
  border: 2px solid ${COLORS.gray};
  transition: border-color 0.2s ease;
  &:hover {
    border-color: ${COLORS.darkGray};
  }
  &:focus {
    border-color: ${COLORS.primary};
    box-shadow: ${COLORS.gray} 0 0 7px;
  }
`;


const TextInput = props => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
    if (props.onFocus) props.onFocus();
  };
  const onBlur = () => {
    setFocused(false);
    if (props.onBlur) props.onBlur();
  };

  return (
    <InputWrapper focus={focused} hasValue={props.value.length > 0}>
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <Input
       id={props.id}
       type={props.type}
       value={props.value}
       onChange={props.onChange} 
       onFocus={onFocus} 
       onBlur={onBlur} />
    </InputWrapper>
  );
};

TextInput.defaultProps = {
  type: 'text',
  label: '',
  id: '',
};

TextInput.propTypes = {
  label: PropTypes.string,
};


export default TextInput;
