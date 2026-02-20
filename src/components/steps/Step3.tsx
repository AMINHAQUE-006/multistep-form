'use client';

import { useForm, Controller, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PreviewIcon from '@mui/icons-material/Preview';
import { useRouter } from 'next/navigation';
import type { Step3Data, DummyUser } from '@/types';
import { step3Schema } from '@/validation/schemas';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  saveStep3,
  selectStep3Data,
  setCurrentStep,
} from '@/store/slices/formSlice';
import { AppTextField } from '@/components/ui/AppTextField';
import { AppButton } from '@/components/ui/AppButton';
import { UserMultiDropdown } from '@/components/form/UserMultiDropdown';

export type Step3FormValues = Step3Data;

const fieldLabel = {
  fontWeight: 600,
  mb: 1.5,
  color: 'text.primary',
  fontSize: '0.875rem',
};

const sectionGap = { mb: 4 };

// Bio character counter sub-component
function BioCounter({ value }: { value: string }) {
  const len = value?.length ?? 0;
  const progress = Math.min((len / 300) * 100, 100);
  const color = len < 50 ? 'error' : len > 280 ? 'warning' : 'success';

  return (
    <Box sx={{ mt: 0.5 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={color}
        sx={{ height: 3, borderRadius: 2, mb: 0.5 }}
      />
      <Typography variant="caption" color={len < 50 ? 'error.main' : 'text.secondary'}>
        {len} / 300 characters {len < 50 && `(${50 - len} more needed)`}
      </Typography>
    </Box>
  );
}

export function Step3() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const savedData = useAppSelector(selectStep3Data);

  const methods = useForm<Step3FormValues>({
    resolver: yupResolver(step3Schema) as never,
    defaultValues: savedData,
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = methods;

  const bioValue = watch('shortBio') ?? '';

  const onSubmit = (data: Step3FormValues) => {
    dispatch(saveStep3(data));
    router.push('/form/preview');
  };

  const goBack = () => dispatch(setCurrentStep(1));

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card sx={{ p: { xs: 3, md: 5 }, mb: 3 }}>

          {/* ── Short Bio ─────────────────────────────────────────────────── */}
          <Box sx={sectionGap}>
            <Typography variant="subtitle2" sx={fieldLabel}>
              Short Bio
            </Typography>
            <AppTextField
              multiline
              rows={4}
              placeholder="Tell us about yourself... (minimum 50 characters)"
              error={errors.shortBio?.message}
              {...register('shortBio')}
            />
            <BioCounter value={bioValue} />
          </Box>

          {/* ── Preferred Departments (multi-select users) ────────────────── */}
          <Box sx={sectionGap}>
            <Typography variant="subtitle2" sx={fieldLabel}>
              Preferred Departments
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1, fontWeight: 400 }}
              >
                (Select one or more)
              </Typography>
            </Typography>
            <Controller
              name="preferredDepartments"
              control={control}
              render={({ field }) => (
                <UserMultiDropdown
                  value={field.value as DummyUser[]}
                  onChange={field.onChange}
                  error={errors.preferredDepartments?.message as string | undefined}
                />
              )}
            />
          </Box>

          {/* ── Portfolio URL ─────────────────────────────────────────────── */}
          <Box sx={sectionGap}>
            <Typography variant="subtitle2" sx={fieldLabel}>
              Portfolio URL
            </Typography>
            <AppTextField
              placeholder="https://your-portfolio.com"
              type="url"
              error={errors.portfolioUrl?.message}
              {...register('portfolioUrl')}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* ── Agree to Terms ────────────────────────────────────────────── */}
          <Box sx={{ mb: 2 }}>
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(field.value)}
                      onChange={field.onChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      <Typography
                        component="span"
                        color="primary.main"
                        fontWeight={600}
                        variant="body2"
                      >
                        Terms of Service
                      </Typography>{' '}
                      and{' '}
                      <Typography
                        component="span"
                        color="primary.main"
                        fontWeight={600}
                        variant="body2"
                      >
                        Privacy Policy
                      </Typography>
                    </Typography>
                  }
                />
              )}
            />
            {errors.agreeToTerms && (
              <FormHelperText error sx={{ ml: 4 }}>
                {errors.agreeToTerms.message}
              </FormHelperText>
            )}
          </Box>

          <Divider sx={{ mt: 3, mb: 3 }} />

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
              color="secondary"
              endIcon={<PreviewIcon />}
            >
              Preview Submission
            </AppButton>
          </Box>
        </Card>
      </Box>
    </FormProvider>
  );
}
