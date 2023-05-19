import { useSelector } from 'react-redux';
import { selectContactFilter } from 'redux/selectors';
import css from './ContactList.module.css';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice';

export function ContactList() {
  const { data = [], isError } = useFetchContactsQuery();

  const filter = useSelector(selectContactFilter);
  const filteredContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const handleDelete = async id => {
    try {
      await deleteContact(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, phone }) => {
        return (
          <li className={css.contactItem} key={id}>
            <span className={css.contactName}>{name}</span>
            <span className={css.contactNumber}>{phone}</span>
            <button
              className={css.contactButton}
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
