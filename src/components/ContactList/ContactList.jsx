import { selectContactFilter } from 'redux/selectors';
import { useSelector } from 'react-redux';
import css from './ContactList.module.css';
import Loader from '../Loader/Loader';
import Notiflix from 'notiflix';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice';

export function ContactList() {
  const { data = [] } = useFetchContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const filter = useSelector(selectContactFilter);

  const filteredContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const handleDelete = async id => {
    try {
      await deleteContact(id);
      Notiflix.Notify.success('The contact has been deleted');
    } catch (error) {
      Notiflix.Notify.failure(error);
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
              className={`${css.contactButton} ${
                isDeleting ? css.disabledButton : ''
              }`}
              onClick={() => handleDelete(id)}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader /> : 'Delete'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
