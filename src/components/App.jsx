import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Form } from './Form/Form';
import css from './App.module.css';

export function App() {
  return (
    <section>
      <h1 className={css.formTitle}>Phonebook</h1>
      <Form />
      <div className={css.filterBlock}>
        <h2 className={css.contactTitle}>Contacts</h2>
        <Filter />
      </div>
      <ContactList />
    </section>
  );
}
