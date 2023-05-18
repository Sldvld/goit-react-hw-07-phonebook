import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import combineReducers from './contactsReducer';

export const store = configureStore({
  reducer: {
    contacts: combineReducers,
    filter: filterReducer,
  },
});
