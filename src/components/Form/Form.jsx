import { useState } from 'react';
import Notiflix from 'notiflix';
import css from './Form.module.css';
import Loader from '../Loader/Loader';
import {
  useCreateContactMutation,
  useFetchContactsQuery,
} from 'redux/contactsSlice';

export function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { data: contacts } = useFetchContactsQuery();
  const [addContact, { error, isLoading }] = useCreateContactMutation();

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const inputChangeHandlerName = evt => {
    setName(evt.currentTarget.value);
  };

  const inputChangeHandlerNumber = evt => {
    setNumber(evt.currentTarget.value);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    const {
      name: { value: name },
      number: { value: number },
    } = evt.currentTarget.elements;

    const isNameExists = contacts.some(
      contact => contact.name?.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      Notiflix.Notify.warning(`${name} is already in contacts`);
      return;
    }

    try {
      await addContact({ name: name, number: number });

      if (error) {
        Notiflix.Notify.failure(error.message);
        return;
      }

      Notiflix.Notify.success(
        `Yes! The contact ${name} has been added to the list`
      );
      formReset();
    } catch (error) {
      Notiflix.Notify.failure(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor="name" className={css.formLabel}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Add name"
          className={css.formInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={inputChangeHandlerName}
        />
        <label htmlFor="number" className={css.formLabel}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          id="number"
          placeholder="Add number: "
          className={css.formInput}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={inputChangeHandlerNumber}
        />

        <button type="submit" disabled={isLoading} className={css.formButton}>
          {isLoading ? <Loader /> : 'Add contact'}
        </button>
      </form>
    </>
  );
}
