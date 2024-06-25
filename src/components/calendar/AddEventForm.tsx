import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
} from '@patternfly/react-core';
import { collection, getFirestore, addDoc } from 'firebase/firestore';

interface FormComponentProps {
  onSubmit: (formData: FormData) => void;
}

type FormData = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
};

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {

  const [formData, setFormData] = useState<FormData>({
    id: 2,
    title: '',
    description: '',
    date: '',
    location: ''
  });

  const handleNameChange = (value: string) => {
    setFormData({ ...formData, title : value });
  };

  const handleDescChange = (value: string) => {
    setFormData({ ...formData, description: value });
  };

  const handleDateChange = (value: string) => {
    setFormData({ ...formData, date: value });
  };

  const handleLocChange = (value: string) => {
    setFormData({ ...formData, location: value });
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subTitle = formData.title;
    const subDesc = formData.description;
    const subDate = formData.date;
    const subLoc = formData.location;

    console.log(subTitle, subDesc, subDate, subLoc);

    const calData = {
      id: formData.id,
      attributes: {
        title: subTitle,
        body: subDesc,
        date: subDate,
        location: subLoc
      }
    };

    const db = getFirestore();
    const newCalDataRef = collection(db, 'events');
    addDoc(newCalDataRef, calData)
      .then(() => {
      console.log('Data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
    {/* Add Event Name */}
      <FormGroup
        label="Event Name"
        isRequired
        fieldId="simple-form-name-01"
      >
        <TextInput
          isRequired
          type="text"
          id="simple-form-name-01"
          name="simple-form-name-01"
          aria-describedby="simple-form-name-01-helper"
          value={formData.title}
          onChange={handleNameChange}
        />
      </FormGroup>

      {/* Add Event Information */}
      <FormGroup label="Event Description" isRequired fieldId="simple-form-info-01">
        <TextInput
          isRequired
          type="text"
          id="simple-form-info-01"
          name="simple-form-info-01"
          value={formData.description}
          onChange={handleDescChange}
        />
      </FormGroup>

        {/* Add Date of Event */}
      <FormGroup label="Date of Event" isRequired fieldId="simple-form-date-01">
        <TextInput
          isRequired
          type="date"
          id="simple-form-date-01"
          name="simple-form-date-01"
          placeholder="555-555-5555"
          value={formData.date}
          onChange={handleDateChange}
        />
      </FormGroup>

      {/* Add Event Location */}
      <FormGroup label="Location" isRequired fieldId="simple-form-loc-01">
        <TextInput
          isRequired
          type="text"
          id="simple-form-loc-01"
          name="simple-form-loc-01"
          value={formData.location}
          onChange={handleLocChange}
        />
      </FormGroup>

      <ActionGroup>
        <Button variant="primary" type="submit">Submit</Button>
      </ActionGroup>
    </Form>
  );
};

export default FormComponent;
