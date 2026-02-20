# Multi-Step Form — Next.js + MUI + React Hook Form + Redux Toolkit

3-step multi-step form built for an internship assignment.

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) — redirects to `/form` automatically.




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