import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Label, Button, Form, ErrorMessage } from './ContactForm.styled';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'The name may contain only letters!!!'
    )
    .min(3, 'Too short')
    .max(15, 'Too long')
    .required('Required')
    .trim(),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits!!!'
    )
    .min(5, 'Too short')
    .max(10, 'Too long')
    .required('Required')
    .trim(),
});

const ContactForm = ({ formSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={FormSchema}
      onSubmit={(values, { resetForm }) => {
        // console.log(values);
        formSubmit({
          id: nanoid(5),
          ...values,
        });
        resetForm();
      }}
    >
      <Form>
        <Label htmlFor="name">
          Name:
          <Field type="text" name="name" />
        </Label>
        <ErrorMessage name="name" component="div" />
        <Label htmlFor="number">
          Number:
          <Field type="tel" name="number" />
        </Label>
        <ErrorMessage name="number" component="div" />
        <Button type="submit">ADD CONTACT</Button>
      </Form>
    </Formik>
  );
};

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleChange = evt => {
//     const { name, value } = evt.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     this.props.formSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <Label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//             value={name}
//             onChange={this.handleChange}
//           />
//         </Label>
//         <Label>
//           Number:
//           <input
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//             value={number}
//             onChange={this.handleChange}
//           />
//         </Label>
//         <Button type="submit" disabled={!name | !number}>
//           ADD CONTACT
//         </Button>
//       </Form>
//     );
//   }
// }

ContactForm.propTypes = {
  formSubmit: PropTypes.func.isRequired,
};

export { ContactForm };
