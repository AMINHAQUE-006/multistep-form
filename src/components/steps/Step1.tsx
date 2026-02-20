// src/components/steps/Step1.tsx
// Step 1: Personal Details
// Fields: First Name, Last Name, Email, Phone, Gender (card select)
// Validates with Yup step1Schema before allowing navigation to Step 2.

'use client';

import { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Step1Data, Gender } from '@/types';
import { step1Schema } from '@/validation/schemas';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { saveStep1, selectStep1Data, setCurrentStep } from '@/store/slices/formSlice';
import { AppTextField } from '@/components/ui/AppTextField';
import { AppButton } from '@/components/ui/AppButton';
import { GenderSelect } from '@/components/form/GenderSelect';
import { cardStyles as styles, pageStyles } from '@/styles/formStyles';

export type Step1FormValues = Step1Data;

export function Step1() {
  const dispatch = useAppDispatch();
  const savedData = useAppSelector(selectStep1Data);

  const methods = useForm<Step1FormValues>({
    resolver: yupResolver(step1Schema),
    // Pre-populate from Redux (persists data when navigating back)
    defaultValues: savedData,
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Step1FormValues) => {
    dispatch(saveStep1(data));
    dispatch(setCurrentStep(1)); // Move to Step 2
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card sx={styles.root}>
          <Typography sx={styles.sectionTitle}>Personal Information</Typography>

          {/* Row: First Name + Last Name */}
          <Box sx={{ ...cardStyles_fieldRow, mb: 3 }}>
            <AppTextField
              label="First Name"
              error={errors.firstName?.message}
              autoFocus
              {...register('firstName')}
            />
            <AppTextField
              label="Last Name"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </Box>

          {/* Email */}
          <AppTextField
            label="Email Address"
            type="email"
            error={errors.email?.message}
            sx={{ mb: 3 }}
            {...register('email')}
          />

          {/* Phone */}
          <AppTextField
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            sx={{ mb: 3 }}
            {...register('phone')}
          />

          {/* Gender — card/chip selector */}
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ mb: 1.5, color: 'text.primary' }}
            >
              Gender
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <GenderSelect
                  value={field.value as Gender | ''}
                  onChange={field.onChange}
                  error={errors.gender?.message}
                />
              )}
            />
          </Box>

          <Divider sx={{ mt: 4, mb: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AppButton
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Continue to Step 2
            </AppButton>
          </Box>
        </Card>
      </Box>
    </FormProvider>
  );
}

// Local alias to avoid importing the full styles object in JSX
const cardStyles_fieldRow = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
  gap: 3,
};
