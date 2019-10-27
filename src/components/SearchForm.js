/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { COLORS, BREAKPOINTS } from '../constants';

const FormWrapper = styled.div`
  position: relative;
  > p {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    line-height: 1;
    padding: 0.5rem 0 0;
    font-size: 0.85rem;
    color: ${COLORS.error};
  }
`;
const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width:${BREAKPOINTS.small}) {
    flex-direction: row;
  }
`;
const InputWrapper = styled.div`
  position: relative;
  @media (min-width:${BREAKPOINTS.small}) {
    flex-grow: 2;
  }

  > button {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);
    padding: 0.6rem;
    border: none;
    background: none;
    color: ${COLORS.darkGray};
    cursor: pointer;
    .icon-compass {
      font-size: 1.5rem;
    }
    &:hover {
      color: ${COLORS.primary};
      > span {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
      }
    }
    > span {
      display: block;
      position: absolute;
      left: -6rem;
      top: 0;
      width: 7.5rem;
      padding: 10px;
      border-radius: 4px;
      background: ${COLORS.dark};
      color: ${COLORS.light};
      margin-left: -1.5rem;
      margin-top: 0.25rem;
      visibility: hidden;
      opacity: 0;
      font-size: 0.8rem;
      transform: translateX(10px);
      transition: all 0.2s ease;
    }
  }
`;

const SearchForm = ({
  loading,
  searchTerm,
  setSearchTerm,
  onSubmit
}) => {
  const [localError, setLocalError] = useState(false);
  const prevTerm = useRef(null); //track previous search term

  const onFormSubmit = useCallback(e => {
    e.preventDefault();
    if (searchTerm.length === 0) {
      setLocalError('Enter a location to search');
      return;
    }
    if (prevTerm.current && prevTerm.current === searchTerm) {
      setLocalError('Enter a new search term');
      return;
    }
    onSubmit();
    prevTerm.current = searchTerm;
  }, [searchTerm]);

  const onChange = useCallback(e => {
    if (loading) { return; }
    if ((searchTerm.length && localError) || 
    ((prevTerm.current && prevTerm.current !== searchTerm) && localError)) {
      setLocalError(false);
    }
    setSearchTerm(e.target.value);
  }, [searchTerm, localError, loading]);

  return (
    <FormWrapper>
      <Form onSubmit={onFormSubmit}>
        <InputWrapper>
          <TextInput
            label="Search For a Store"
            onChange={onChange}
            value={searchTerm} />
          <button type="button">
            <div className="icon-compass"></div>
            <span>Use My Location</span>
          </button>
        </InputWrapper>
        <Button type="submit" disabled={loading}>
          Search Now
        </Button>
      </Form>
      {localError && <p>{localError}</p>}
    </FormWrapper>
  );
};

export default SearchForm;