// App.tsx
import React, { FormEvent, useState } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { AddressForm } from './AddressForm';
import { AccountForm } from './AccountForm';
import StartPage from './StartPage';

export type CustomFormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: CustomFormData = {
  firstName: '',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: '',
};

function App() {
  const [data, setData] = useState<CustomFormData>(INITIAL_DATA);
  const [formDataList, setFormDataList] = useState<CustomFormData[]>([]);
  const [showStartPage, setShowStartPage] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function updateFields(fields: Partial<CustomFormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const steps = [
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ];

  function next(index?: number) {
    setCurrentStepIndex(0); // Reset to the first step
    setEditingIndex(index !== undefined ? index : null);
    setShowStartPage(false);
  }

  const handleEdit = (index: number) => {
    setData(formDataList[index]); // Load existing data into the form
    next(index); // Move to the multipage form for editing
  };

  function back() {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  }

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // If editing, update the existing data
      setFormDataList((prev) =>
        prev.map((item, index) => (index === editingIndex ? { ...data } : item))
      );
    } else {
      // If not editing, add new data
      setFormDataList((prev) => [...prev, { ...data }]);
    }

    setData(INITIAL_DATA);
    setShowStartPage(true); // Reset to show StartPage again
    setCurrentStepIndex(0); // Reset to the first step
    setEditingIndex(null); // Reset editing index
    alert(editingIndex !== null ? 'Successful Update' : 'Successful Account Creation');
  };

  return (
    <Container component="main" maxWidth="sm">
      {showStartPage ? (
        <StartPage onEdit={handleEdit} onNext={() => setShowStartPage(false)} formDataList={formDataList} />
      ) : (
        <Paper
          style={{
            padding: '2rem',
            margin: '2rem auto',
            borderRadius: '.5rem',
            fontFamily: 'Arial',
          }}
        >
          <form onSubmit={onSubmit}>
            <div style={{ textAlign: 'right' }}>
              {currentStepIndex + 1} / {steps.length}
            </div>
            {steps[currentStepIndex]}
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              {!isFirstStep && (
                <Button type="button" onClick={back}>
                  Back
                </Button>
              )}
              <Button type="submit" disabled={isLastStep}>
                {isLastStep ? 'Finish' : 'Next'}
              </Button>
            </div>
          </form>
        </Paper>
      )}
    </Container>
  );
}

export default App;
