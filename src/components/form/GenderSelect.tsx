// src/components/form/GenderSelect.tsx
// Card-style gender selector — required by assignment spec.
// Each option is a clickable card, not a radio button.
// Integrates with react-hook-form via Controller.

'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import type { Gender } from '@/types';
import { genderStyles as styles } from '@/styles/formStyles';

const GENDER_OPTIONS: { value: Gender; label: string; icon: React.ReactNode }[] = [
  { value: 'male', label: 'Male', icon: <MaleIcon fontSize="large" /> },
  { value: 'female', label: 'Female', icon: <FemaleIcon fontSize="large" /> },
  { value: 'other', label: 'Other', icon: <TransgenderIcon fontSize="large" /> },
];

interface GenderSelectProps {
  value: Gender | '';
  onChange: (value: Gender) => void;
  error?: string;
}

export function GenderSelect({ value, onChange, error }: GenderSelectProps) {
  return (
    <Box>
      <Box sx={styles.group}>
        {GENDER_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <Box
              key={opt.value}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => e.key === 'Enter' && onChange(opt.value)}
              sx={styles.card(selected)}
            >
              {opt.icon}
              <Typography sx={styles.label}>{opt.label}</Typography>
            </Box>
          );
        })}
      </Box>
      {error && (
        <FormHelperText error sx={{ mt: 1, ml: 1 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
