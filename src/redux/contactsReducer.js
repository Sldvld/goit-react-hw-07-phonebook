import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { fetchContacts } from './contactsOperation';

const entities = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => action.payload,
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
});
const error = createReducer(null, {
  [fetchContacts.rejected]: (_, action) => action.payload,
  [fetchContacts.pending]: (_, action) => null,
});
export default combineReducers({
  entities,
  isLoading,
  error,
});
