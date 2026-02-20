
import * as yup from 'yup';

// ─── Step 1: Personal Details 

export const step1Schema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),

  lastName: yup
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),

  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),

  phone: yup
    .string()
    .trim()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      'Please enter a valid phone number',
    )
    .required('Phone number is required'),

  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Please select a gender')
    .required('Please select a gender'),
});

// ─── Step 2: Professional Information 

export const step2Schema = yup.object({
  jobTitle: yup
    .string()
    .trim()
    .min(2, 'Job title must be at least 2 characters')
    .required('Job title is required'),

  experienceLevel: yup
    .object()
    .nullable()
    .required('Please select an experience level'),

  skills: yup
    .array()
    .of(
      yup.object({
        skillName: yup
          .string()
          .trim()
          .min(1, 'Skill name is required')
          .required('Skill name is required'),
        yearsOfExperience: yup
          .number()
          .typeError('Must be a number')
          .min(0, 'Cannot be negative')
          .max(50, 'Maximum 50 years')
          .required('Years of experience is required'),
      }),
    )
    .min(1, 'Please add at least one skill')
    .required(),

  availableForRemote: yup
    .string()
    .oneOf(['yes', 'no'], 'Please select an option')
    .required('Please select an option'),
});

// ─── Step 3: Additional Details 

export const step3Schema = yup.object({
  shortBio: yup
    .string()
    .trim()
    .min(50, 'Bio must be at least 50 characters')
    .max(300, 'Bio cannot exceed 300 characters')
    .required('Short bio is required'),

  preferredDepartments: yup
    .array()
    .min(1, 'Please select at least one department')
    .required('Please select at least one department'),

  portfolioUrl: yup
    .string()
    .trim()
    .url('Please enter a valid URL (include https://)')
    .required('Portfolio URL is required'),

  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms to continue')
    .required('You must agree to the terms to continue'),
});

// Step schemas array for indexed access: schemas[0] = step1Schema etc.
export const stepSchemas = [step1Schema, step2Schema, step3Schema];
