'use client';

import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Step2Data, Product } from '@/types';
import { step2Schema } from '@/validation/schemas';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  saveStep2,
  selectStep2Data,
  setCurrentStep,
} from '@/store/slices/formSlice';
import { AppTextField } from '@/components/ui/AppTextField';
import { AppButton } from '@/components/ui/AppButton';
import { ProductDropdown } from '@/components/form/ProductDropdown';
import { SkillsSection } from '@/components/form/SkillsSection';
import { RemoteToggle } from '@/components/form/RemoteToggle';

export type Step2FormValues = Step2Data;

const fieldLabel = {
  fontWeight: 600,
  mb: 1.5,
  color: 'text.primary',
  fontSize: '0.875rem',
};

const sectionGap = { mb: 4 };

export function Step2() {
  const dispatch = useAppDispatch();
  const savedData = useAppSelector(selectStep2Data);

  const methods = useForm<Step2FormValues>({
    resolver: yupResolver(step2Schema) as never,
    defaultValues: savedData,
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Step2FormValues) => {
    dispatch(saveStep2(data));
    dispatch(setCurrentStep(2)); // Move to Step 3
  };

  const goBack = () => dispatch(setCurrentStep(0));

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card sx={{ p: { xs: 3, md: 5 }, mb: 3 }}>

          {/* ── Job Title ─────────────────────────────────────────────────── */}
          <Box sx={sectionGap}>
            <Typography variant="subtitle2" sx={fieldLabel}>
              Job Title
            </Typography>
            <AppTextField
              placeholder="e.g. Senior Frontend Developer"
              error={errors.jobTitle?.message}
              {...register('jobTitle')}
            />
          </Box>

          {/* ── Experience Level (infinite scroll dropdown) ───────────────── */}
          <Box sx={sectionGap}>
            <Typography variant="subtitle2" sx={fieldLabel}>
              Experience Level
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1, fontWeight: 400 }}
              >
                (Scroll to load more)
              </Typography>
            </Typography>
            <Controller
              name="experienceLevel"
              control={control}
              render={({ field }) => (
                <ProductDropdown
                  value={field.value as Product | null}
                  onChange={field.onChange}
                  error={errors.experienceLevel?.message as string | undefined}
                />
              )}
            />
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* ── Skills ───────────────────────────────────────────────────── */}
          <Box sx={sectionGap}>
            <Typography variant="subtitle2" sx={{ ...fieldLabel, mb: 2 }}>
              Skills
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1, fontWeight: 400 }}
              >
                (Add at least one)
              </Typography>
            </Typography>
            <SkillsSection />
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* ── Available for Remote ─────────────────────────────────────── */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ ...fieldLabel, mb: 2 }}>
              Available for Remote Work?
            </Typography>
            <Controller
              name="availableForRemote"
              control={control}
              render={({ field }) => (
                <RemoteToggle
                  value={field.value as 'yes' | 'no' | ''}
                  onChange={field.onChange}
                  error={errors.availableForRemote?.message}
                />
              )}
            />
          </Box>

          <Divider sx={{ mt: 4, mb: 3 }} />

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <AppButton
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={goBack}
              type="button"
            >
              Back
            </AppButton>
            <AppButton
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Continue to Step 3
            </AppButton>
          </Box>
        </Card>
      </Box>
    </FormProvider>
  );
}
