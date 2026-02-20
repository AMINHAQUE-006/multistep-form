# Multi-Step Form — Next.js + MUI + React Hook Form + Redux Toolkit

A production-grade 3-step multi-step form built for an internship assignment.

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) — redirects to `/form` automatically.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (providers)
│   ├── page.tsx                    # Redirects to /form
│   └── form/
│       ├── page.tsx                # Multi-step form orchestrator
│       └── preview/page.tsx        # Final preview page
│
├── components/
│   ├── ui/                         # Generic reusable UI
│   │   ├── AppButton.tsx           # Button with loading state
│   │   ├── AppTextField.tsx        # TextField with error string prop
│   │   ├── FormStepper.tsx         # Step progress indicator
│   │   ├── ReduxProvider.tsx       # Client-side Redux wrapper
│   │   └── MuiProvider.tsx         # Client-side MUI theme wrapper
│   │
│   ├── form/                       # Form-specific reusable components
│   │   ├── GenderSelect.tsx        # Card-style gender picker
│   │   ├── RemoteToggle.tsx        # Yes/No styled toggle
│   │   ├── SkillsSection.tsx       # Dynamic add/remove skills list
│   │   ├── ProductDropdown.tsx     # Single-select + infinite scroll (Products API)
│   │   └── UserMultiDropdown.tsx   # Multi-select + infinite scroll (Users API)
│   │
│   └── steps/                      # One component per step
│       ├── Step1.tsx               # Personal Details
│       ├── Step2.tsx               # Professional Information
│       └── Step3.tsx               # Additional Details
│
├── hooks/
│   ├── redux.ts                    # Typed useAppDispatch / useAppSelector
│   └── useInfiniteScroll.ts        # Generic infinite scroll hook
│
├── lib/
│   ├── theme.ts                    # MUI theme (DM Sans, navy + orange)
│   └── emotionCache.ts             # Emotion cache for MUI SSR
│
├── services/
│   └── api.ts                      # All API fetch functions (fetchProducts, fetchUsers)
│
├── store/
│   ├── index.ts                    # Redux store config
│   └── slices/
│       └── formSlice.ts            # Form data + currentStep state
│
├── styles/
│   └── formStyles.ts               # All sx style objects (no inline styles in JSX)
│
├── types/
│   └── index.ts                    # All TypeScript types (no `any`)
│
└── validation/
    └── schemas.ts                  # All Yup schemas (step1Schema, step2Schema, step3Schema)
```

---

## 🏗️ Architecture Decisions

### Separation of Concerns (as evaluated)
| Concern | Location |
|---|---|
| Form logic | `components/steps/Step*.tsx` with `react-hook-form` |
| Validation | `validation/schemas.ts` (Yup only, no UI here) |
| API logic | `services/api.ts` (fetch functions only) |
| UI components | `components/ui/` and `components/form/` |
| Global state | `store/slices/formSlice.ts` |
| Styles | `styles/formStyles.ts` (sx objects, no inline) |
| Types | `types/index.ts` |

### Form Data Persistence
All step data is saved to Redux on successful validation before navigation.
Going back to a previous step restores all entered values via `defaultValues`.

### Infinite Scroll Implementation
Both `ProductDropdown` and `UserMultiDropdown` use **IntersectionObserver** on
a sentinel `<div>` at the bottom of the list. When it enters the viewport,
the next page is fetched. The API supports this via `skip` + `limit` params.

### Validation
- Schema-based via **Yup** — all rules defined in `validation/schemas.ts`
- Connected to `react-hook-form` via `@hookform/resolvers/yup`
- Step-level: Next button is only enabled after the step's schema passes
- Proper error messages shown per field

---

## ✅ Assignment Checklist

- [x] Step 1: First Name, Last Name, Email, Phone, Gender (card select)
- [x] Step 2: Job Title, Experience Level (product dropdown), Skills (dynamic), Remote toggle
- [x] Step 3: Bio (50-300 chars), Departments (multi-select users), Portfolio URL, Terms
- [x] Gender as card/chip style options (not radio buttons)
- [x] Experience Level: fetches from dummyjson.com/products with infinite scroll
- [x] Each dropdown item shows: thumbnail, title, category, price (products) / avatar, name, company, email (users)
- [x] Skills: dynamic add/remove, at least one required
- [x] Remote toggle: visually styled Yes/No (not default radio)
- [x] Bio: min 50 / max 300 characters with live counter
- [x] Departments: multi-select with infinite scroll from dummyjson.com/users
- [x] Preview page shows all data structured in sections
- [x] Schema-based validation (Yup)
- [x] Form data persists when navigating back
- [x] No static dropdown arrays (all data fetched from API)
- [x] React Hook Form + Yup + TypeScript
- [x] No `any` types
- [x] All form elements are reusable components
- [x] Clear separation of form logic / validation / API / UI
