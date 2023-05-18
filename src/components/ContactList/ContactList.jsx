import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { selectContacts, getContactFilter } from 'redux/selectors';
import * as contactsOperations from '../../redux/contactsOperation';
import * as contactsSelectors from '../../redux/selectors';
import css from './ContactList.module.css';

export function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.selectContacts);
  const filter = useSelector(getContactFilter);

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, phone }) => {
        return (
          <li className={css.contactItem} key={id}>
            <span className={css.contactName}>{name}</span>
            <span className={css.contactNumber}>{phone}</span>
            <button
              className={css.contactButton}
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
