
'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentStep } from '@/store/slices/formSlice';
import { FormStepper } from '@/components/ui/FormStepper';
import { Step1 } from '@/components/steps/Step1';
import { Step2 } from '@/components/steps/Step2';
import { Step3 } from '@/components/steps/Step3';
import { pageStyles as styles } from '@/styles/formStyles';

export default function FormPage() {
  const currentStep = useAppSelector(selectCurrentStep);

  const stepComponents = [<Step1 key="s1" />, <Step2 key="s2" />, <Step3 key="s3" />];

  const stepTitles = [
    { title: 'Personal Details', sub: 'Tell us a bit about yourself' },
    { title: 'Professional Information', sub: 'Share your work experience and skills' },
    { title: 'Additional Details', sub: 'Almost there — just a few more things' },
  ];

  const current = stepTitles[currentStep] ?? stepTitles[0];

  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        {/* Header */}
        <Box sx={styles.header}>
          <Typography variant="h4" sx={styles.headerTitle}>
            {current.title}
          </Typography>
          <Typography variant="body1" sx={styles.headerSubtitle}>
            {current.sub}
          </Typography>
        </Box>

        {/* Step progress indicator */}
        <FormStepper activeStep={currentStep} />

        {/* Active step form */}
        {stepComponents[currentStep]}
      </Box>
    </Box>
  );
}
