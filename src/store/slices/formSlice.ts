import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormData, Step1Data, Step2Data, Step3Data } from '@/types';
import type { RootState } from '@/store';

interface FormState {
  currentStep: number; // 0-indexed: 0=Step1, 1=Step2, 2=Step3, 3=Preview
  data: FormData;
}

const initialStep1: Step1Data = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
};

const initialStep2: Step2Data = {
  jobTitle: '',
  experienceLevel: null,
  skills: [{ skillName: '', yearsOfExperience: '' }], // start with one empty skill row
  availableForRemote: '',
};

const initialStep3: Step3Data = {
  shortBio: '',
  preferredDepartments: [],
  portfolioUrl: '',
  agreeToTerms: false,
};

const initialState: FormState = {
  currentStep: 0,
  data: {
    step1: initialStep1,
    step2: initialStep2,
    step3: initialStep3,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveStep1: (state, action: PayloadAction<Step1Data>) => {
      state.data.step1 = action.payload;
    },
    saveStep2: (state, action: PayloadAction<Step2Data>) => {
      state.data.step2 = action.payload;
    },
    saveStep3: (state, action: PayloadAction<Step3Data>) => {
      state.data.step3 = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { saveStep1, saveStep2, saveStep3, setCurrentStep, resetForm } = formSlice.actions;

// Selectors
export const selectStep1Data = (state: RootState) => state.form.data.step1;
export const selectStep2Data = (state: RootState) => state.form.data.step2;
export const selectStep3Data = (state: RootState) => state.form.data.step3;
export const selectAllFormData = (state: RootState) => state.form.data;
export const selectCurrentStep = (state: RootState) => state.form.currentStep;

export default formSlice.reducer;
