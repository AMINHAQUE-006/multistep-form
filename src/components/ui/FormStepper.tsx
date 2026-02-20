// src/components/ui/FormStepper.tsx
'use client';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';

const STEPS = [
  { label: 'Personal Details', description: 'Who you are' },
  { label: 'Professional Info', description: 'What you do' },
  { label: 'Additional Details', description: 'Final touches' },
];

interface FormStepperProps {
  activeStep: number; // 0-indexed
}

export function FormStepper({ activeStep }: FormStepperProps) {
  return (
    <Box sx={{ mb: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {STEPS.map((step) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                <Box
                  component="span"
                  sx={{
                    fontSize: '0.7rem',
                    color: 'text.secondary',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  {step.description}
                </Box>
              }
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
