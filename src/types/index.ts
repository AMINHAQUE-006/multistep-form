// src/types/index.ts
// Central type definitions for the entire multi-step form.
// Defined once here — imported everywhere. No `any` used.

// ─── API Types ────────────────────────────────────────────────────────────────

// Shape returned by https://dummyjson.com/products
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}

export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Shape returned by https://dummyjson.com/users
export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  company: {
    name: string;
  };
}

export interface UsersApiResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

// ─── Form Data Types 

export type Gender = 'male' | 'female' | 'other';

export interface Step1Data {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender | '';
}

export interface Skill {
  skillName: string;
  yearsOfExperience: number | '';
}

export interface Step2Data {
  jobTitle: string;
  experienceLevel: Product | null; // full product object stored, not just ID
  skills: Skill[];
  availableForRemote: 'yes' | 'no' | '';
}

export interface Step3Data {
  shortBio: string;
  preferredDepartments: DummyUser[]; // array of selected users
  portfolioUrl: string;
  agreeToTerms: boolean;
}

// Combined form state — union of all steps
export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

// ─── Step Meta 

export interface StepConfig {
  id: number;
  label: string;
  description: string;
}
