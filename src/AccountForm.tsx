// AccountForm.tsx
import React from 'react';
import { TextField, Typography, Grid } from '@mui/material';

type AccountFormProps = {
  email: string;
  password: string;
  updateFields: (fields: Partial<{ email: string; password: string }>) => void;
};

export function AccountForm({ email, password, updateFields }: AccountFormProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Account Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            autoFocus
            label="Email"
            required
            type="email"
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            required
            type="password"
            value={password}
            onChange={(e) => updateFields({ password: e.target.value })}
          />
        </Grid>
      </Grid>
    </div>
  );
}
