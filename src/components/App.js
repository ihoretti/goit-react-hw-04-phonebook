import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ThemeProvider } from 'styled-components';
//import { ToastContainer, toast } from 'react-toastify';

import { theme } from '../Theme/Theme';
import { Contact } from './ContactList/ContactList';
import Container from './Container/Container.styled';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { PrimaryTitle, SecondaryTitle } from './Titles/Titles';
import { Notification } from './ContactList/ContactList.styled';
import { useLocalStorage } from '../Hooks/UseLocalStorage';
//import 'react-toastify/dist/ReactToastify.css';

const CONTACTS_KEY = 'contacts';

const initContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(CONTACTS_KEY, initContacts);
  const [filter, setFilter] = useState('');

  const addNewContact = values => {
    const { name, number } = values;

    const isInContacts = contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const handleFindContact = e => setFilter(e.target.value);

  const getVisibleContact = () => {
    const normalizeFilter = filter.toLocaleLowerCase();

    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };
  const visibleContact = getVisibleContact();

  return (
    <ThemeProvider theme={theme}>
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <PrimaryTitle>Phonebook</PrimaryTitle>
        <ContactForm addNewContact={addNewContact} />

        <SecondaryTitle>Contact</SecondaryTitle>
        {!!contacts.length && (
          <Filter
            title="Find contacts by name"
            filter={filter}
            handleFindContact={handleFindContact}
          />
        )}
        {!!contacts.length && (
          <Contact
            visibleContact={visibleContact}
            deleteContact={deleteContact}
            contacts={contacts}
          />
        )}

        {contacts.length === 0 && (
          <Notification>You have no contacts</Notification>
        )}
      </Container>
    </ThemeProvider>
  );
};
