import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsAPI from '../API/contactsAPI';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const contacts = await contactsAPI.fetchContacts();
    return contacts;
  }
);
