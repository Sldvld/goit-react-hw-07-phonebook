import { useSelector, useDispatch } from 'react-redux';
import { selectContactFilter } from 'redux/selectors';
import { setContactFilter } from '../../redux/filterSlice';
import React from 'react';

import css from './Filter.module.css';

export function Filter() {
  const filter = useSelector(selectContactFilter);
  const dispatch = useDispatch();

  const handleFilter = evt => {
    const { value } = evt.currentTarget;
    dispatch(setContactFilter(value.toLowerCase()));
  };

  return (
    <>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        className={css.filterForm}
        name="filter"
        type="text"
        value={filter}
        onChange={handleFilter}
        placeholder="Search..."
      />
    </>
  );
}
