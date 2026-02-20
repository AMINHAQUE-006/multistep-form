// src/app/form/preview/page.tsx
// Final preview page — displays all data from all 3 steps.
// Structured in sections with cards. No API submission required.

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { selectAllFormData, resetForm, setCurrentStep } from '@/store/slices/formSlice';
import { previewStyles as styles, pageStyles } from '@/styles/formStyles';
import SectionHeader from '../ui/SectionHeader';
import Field from '../ui/Field';


export default function PreviewPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const allData = useAppSelector(selectAllFormData);
  const { step1, step2, step3 } = allData;

  useEffect(() => {
    if (!step1.firstName) {
      router.replace('/form');
    }
  }, [step1.firstName, router]);

  const handleEdit = (stepIndex: number) => {
    dispatch(setCurrentStep(stepIndex));
    router.push('/form');
  };

  const handleReset = () => {
    dispatch(resetForm());
    router.push('/form');
  };

  if (!step1.firstName) return null;

  
  return (
    // Sucess banner on all step completed
    <Box sx={pageStyles.root}>
      <Box sx={pageStyles.container}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            p: 3,
            bgcolor: 'success.main',
            borderRadius: 3,
            color: 'white',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight={700}>
              All steps completed!
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Review your information below before submitting.
            </Typography>
          </Box>
        </Box>

        {/* Step 1 Preview: Personal Details */}
        <Card sx={{ p: { xs: 3, md: 4 }, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <SectionHeader icon={<PersonIcon />} title="Personal Details" />
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(0)}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
          </Box>

          <Box sx={styles.grid}>
            <Field label="First Name" value={step1.firstName} />
            <Field label="Last Name" value={step1.lastName} />
            <Field label="Email" value={step1.email} />
            <Field label="Phone" value={step1.phone} />
            <Field
              label="Gender"
              value={
                step1.gender ? (
                  <Chip
                    label={step1.gender.charAt(0).toUpperCase() + step1.gender.slice(1)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ) : '—'
              }
            />
          </Box>
        </Card>

        {/* ── Step 2 Preview: Professional Information */}
        <Card sx={{ p: { xs: 3, md: 4 }, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <SectionHeader icon={<WorkIcon />} title="Professional Information" />
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(1)}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
          </Box>

          <Box sx={styles.grid}>
            <Field label="Job Title" value={step2.jobTitle} />
            <Field
              label="Available for Remote"
              value={
                step2.availableForRemote ? (
                  <Chip
                    label={step2.availableForRemote === 'yes' ? '✓ Yes' : '✕ No'}
                    size="small"
                    color={step2.availableForRemote === 'yes' ? 'success' : 'default'}
                    variant="outlined"
                  />
                ) : '—'
              }
            />
          </Box>

          {/* Experience Level */}
          {step2.experienceLevel && (
            <Box sx={{ mt: 3 }}>
              <Typography sx={styles.fieldLabel}>Experience Level</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mt: 1,
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  maxWidth: 400,
                }}
              >
                <Image
                  src={step2.experienceLevel.thumbnail}
                  alt={step2.experienceLevel.title}
                  width={48}
                  height={48}
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {step2.experienceLevel.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step2.experienceLevel.category} · ${step2.experienceLevel.price}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* Skills */}
          {step2.skills.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography sx={styles.fieldLabel}>Skills</Typography>
              <Box sx={{ mt: 1 }}>
                {step2.skills.map((skill, i) => (
                  <Box key={i} sx={styles.skillRow}>
                    <Typography variant="body2" fontWeight={600}>
                      {skill.skillName}
                    </Typography>
                    <Chip
                      label={`${skill.yearsOfExperience} yr${Number(skill.yearsOfExperience) !== 1 ? 's' : ''}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Card>

        {/* ── Step 3 Preview: Additional Details  */}
        <Card sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <SectionHeader icon={<InfoIcon />} title="Additional Details" />
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(2)}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
          </Box>

          {/* Bio */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={styles.fieldLabel}>Short Bio</Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 2,
                lineHeight: 1.8,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              {step3.shortBio}
            </Typography>
          </Box>

          {/* Portfolio URL */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={styles.fieldLabel}>Portfolio URL</Typography>
            <Typography
              component="a"
              href={step3.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                fontSize: '0.95rem',
                wordBreak: 'break-all',
              }}
            >
              {step3.portfolioUrl}
            </Typography>
          </Box>

          {/* Preferred Departments */}
          {step3.preferredDepartments.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={styles.fieldLabel}>
                Preferred Departments ({step3.preferredDepartments.length} selected)
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
                {step3.preferredDepartments.map((user) => (
                  <Box
                    key={user.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: '6px 12px 6px 6px',
                      bgcolor: 'grey.50',
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: 'grey.200',
                    }}
                  >
                    <Avatar src={user.image} sx={{ width: 28, height: 28 }} />
                    <Box>
                      <Typography variant="caption" fontWeight={600} display="block" lineHeight={1.2}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" lineHeight={1}>
                        {user.company.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Terms */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              bgcolor: 'success.light',
              borderRadius: 2,
              color: 'success.contrastText',
            }}
          >
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
            <Typography variant="body2" fontWeight={600} color="success.dark">
              Terms and conditions accepted
            </Typography>
          </Box>
        </Card>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pb: 4 }}>
          <Button variant="outlined" onClick={handleReset} sx={{ textTransform: 'none' }}>
            Start Over
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ textTransform: 'none', px: 5 }}
            // TODO: instead of alert use API Handler
            onClick={() => alert('Form would be submitted to the API here!')}
          >
            Submit Application
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
