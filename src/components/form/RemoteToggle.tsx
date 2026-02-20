// src/components/form/RemoteToggle.tsx
// Visually styled Yes/No toggle for "Available for Remote" field.
// NOT a default radio button — styled as pill toggle buttons per spec.

'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import { remoteStyles as styles } from '@/styles/formStyles';

interface RemoteToggleProps {
  value: 'yes' | 'no' | '';
  onChange: (value: 'yes' | 'no') => void;
  error?: string;
}

export function RemoteToggle({ value, onChange, error }: RemoteToggleProps) {
  return (
    <Box>
      <Box sx={styles.group}>
        {(['yes', 'no'] as const).map((opt) => (
          <Box
            key={opt}
            role="button"
            tabIndex={0}
            aria-pressed={value === opt}
            onClick={() => onChange(opt)}
            onKeyDown={(e) => e.key === 'Enter' && onChange(opt)}
            sx={styles.button(value === opt)}
          >
            <Typography fontWeight={600} textAlign="center" textTransform="uppercase">
              {opt === 'yes' ? '✓ Yes' : '✕ No'}
            </Typography>
          </Box>
        ))}
      </Box>
      {error && (
        <FormHelperText error sx={{ mt: 1, ml: 1 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
