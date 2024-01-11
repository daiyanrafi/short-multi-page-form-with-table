// StartPage.tsx
import React from 'react';
import {
  Typography,
  Paper,
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
} from '@mui/material';

import { CustomFormData } from './App'; // Import the CustomFormData type

type StartPageProps = {
  onNext: () => void;
  formDataList: CustomFormData[];
};

const StartPage: React.FC<StartPageProps> = ({ onNext, formDataList }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem', width: '80%' }}>
        <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">User Data Table</Typography>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Add New Cases
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              {/* Add other columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {formDataList.map((formData, index) => (
              <TableRow key={index}>
                <TableCell>{formData.street}</TableCell>
                <TableCell>{formData.city}</TableCell>
                <TableCell>{formData.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default StartPage;
