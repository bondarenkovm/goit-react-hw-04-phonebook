import { useState } from 'react';
// import { Component } from 'react';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
// import { testContacts } from 'data';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { useLocalStorage } from 'hooks';

// function useLocalStorage(key, defaultArray) {
//   const [state, setState] = useState(
//     () => JSON.parse(window.localStorage.getItem(key)) ?? defaultArray
//   );

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// }

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  // const [contacts, setContacts] = useState(
  //   () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  // );
  const [filter, setfilter] = useState('');

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  function formSubmitHandler(data) {
    if (contacts.find(contact => contact.name === data.name)) {
      toast(`${data.name} is alreary in contacts`, {
        style: {
          background: '#ca1616',
          color: '#fff',
        },
      });
    } else {
      const newContact = { ...data };
      setContacts(prevState => [...prevState, newContact]);
    }
  }

  function deleteContact(id) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  function onFilterName({ target: { value } }) {
    setfilter(value);
  }

  const lowerCaseFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(lowerCaseFilter)
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm formSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeInput={onFilterName}></Filter>
      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
      ></ContactList>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </Container>
  );
  // }
}

//-----------------------class----------------------------

// class App extends Component {
//   state = {
//     // contacts: [],
//     contacts: testContacts,
//     filter: '',
//   };

//   componentDidMount() {
//     const contact = JSON.parse(localStorage.getItem('contacts'));
//     // console.log(contact);
//     if (contact !== null) {
//       this.setState({ contacts: contact });
//     } else {
//       this.setState({
//         contacts: [],
//         // contacts: testContacts,
//       });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmitHandler = data => {
//     if (this.state.contacts.find(contact => contact.name === data.name)) {
// alert(`${data.name} is alreary in contacts`);
// toast(`${data.name} is alreary in contacts`, {
//   style: {
//     background: '#ca1616',
//     color: '#fff',
//   },
// });
//     } else {
//       const newContact = { ...data };
//       // newContact.id = nanoid();
//       this.setState(prevState => {
//         return { contacts: [...prevState.contacts, newContact] };
//       });
//     }
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   onFilterName = evt => {
//     this.setState({ filter: evt.target.value });
//   };

//   filterContactsName = () => {
//     const { contacts, filter } = this.state;
//     const lowerCaseFilter = filter.toLowerCase();
//     return contacts.filter(({ name }) =>
//       name.toLowerCase().includes(lowerCaseFilter)
//     );
//   };

//   render() {
//     const filteredContacts = this.filterContactsName();

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm formSubmit={this.formSubmitHandler} />
//         <h2>Contacts</h2>
//         <Filter
//           value={this.state.filter}
//           onChangeInput={this.onFilterName}
//         ></Filter>
//         <ContactList
//           contacts={filteredContacts}
//           onDelete={this.deleteContact}
//         ></ContactList>
//       </Container>
//     );
//   }
// }

export { App };
