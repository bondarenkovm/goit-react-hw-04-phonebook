import { Component } from 'react';
// import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
// import { testContacts } from 'data';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contact = JSON.parse(localStorage.getItem('contacts'));
    // console.log(contact);
    if (contact !== null) {
      this.setState({ contacts: contact });
    } else {
      this.setState({
        contacts: [],
        // contacts: testContacts,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    if (this.state.contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is alreary in contacts`);
    } else {
      const newContact = { ...data };
      // newContact.id = nanoid();
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, newContact] };
      });
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterName = evt => {
    this.setState({ filter: evt.target.value });
  };

  filterContactsName = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  render() {
    const filteredContacts = this.filterContactsName();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm formSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChangeInput={this.onFilterName}
        ></Filter>
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        ></ContactList>
      </Container>
    );
  }
}

export { App };
