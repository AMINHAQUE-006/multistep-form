// src/components/ui/AppTextField.tsx
'use client';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

interface AppTextFieldProps extends Omit<TextFieldProps, 'error'> {
  error?: string;
}

export function AppTextField({ error, sx, ...rest }: AppTextFieldProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      error={Boolean(error)}
      helperText={error ?? rest.helperText}
      sx={sx}
      {...rest}
    />
  );
}
