// src/styles/formStyles.ts
// Centralized style objects for every component in the form.
// No raw sx values in JSX — everything comes from here.

import type { SxProps, Theme } from '@mui/material/styles';
type Sx = SxProps<Theme>;

// ─── Page / Layout ────────────────────────────────────────────────────────────

export const pageStyles = {
  root: {
    minHeight: '100vh',
    bgcolor: 'background.default',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    py: { xs: 3, md: 6 },
    px: 2,
  } satisfies Sx,

  container: {
    width: '100%',
    maxWidth: 760,
  } satisfies Sx,

  header: {
    textAlign: 'center',
    mb: 5,
  } satisfies Sx,

  headerTitle: {
    fontWeight: 800,
    color: 'primary.main',
    mb: 1,
    fontSize: { xs: '1.75rem', md: '2.25rem' },
  } satisfies Sx,

  headerSubtitle: {
    color: 'text.secondary',
    fontSize: '1rem',
  } satisfies Sx,
} as const;

// ─── Stepper ─────────────────────────────────────────────────────────────────

export const stepperStyles = {
  root: {
    mb: 5,
    px: 1,
  } satisfies Sx,
} as const;

// ─── Form Card ────────────────────────────────────────────────────────────────

export const cardStyles = {
  root: {
    p: { xs: 3, md: 5 },
    mb: 3,
  } satisfies Sx,

  sectionTitle: {
    fontWeight: 700,
    color: 'primary.main',
    mb: 3,
    fontSize: '1.125rem',
  } satisfies Sx,

  fieldRow: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: 3,
  } satisfies Sx,

  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 4,
    pt: 3,
    borderTop: '1px solid',
    borderColor: 'divider',
  } satisfies Sx,
} as const;

// ─── Gender Card Select ───────────────────────────────────────────────────────

export const genderStyles = {
  group: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  } satisfies Sx,

  card: (selected: boolean): Sx => ({
    flex: 1,
    minWidth: 100,
    p: 2,
    borderRadius: 3,
    border: '2px solid',
    borderColor: selected ? 'primary.main' : 'grey.200',
    bgcolor: selected ? 'primary.main' : 'background.paper',
    color: selected ? 'primary.contrastText' : 'text.primary',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
    transition: 'all 0.18s ease',
    '&:hover': {
      borderColor: 'primary.main',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(15,76,129,0.15)',
    },
  }),

  label: {
    fontWeight: 600,
    fontSize: '0.875rem',
  } satisfies Sx,
} as const;

// ─── Remote Toggle ────────────────────────────────────────────────────────────

export const remoteStyles = {
  group: {
    display: 'flex',
    gap: 2,
  } satisfies Sx,

  button: (selected: boolean): Sx => ({
    flex: 1,
    py: 1.5,
    fontWeight: 700,
    fontSize: '0.95rem',
    borderRadius: 2,
    border: '2px solid',
    borderColor: selected ? 'primary.main' : 'grey.300',
    bgcolor: selected ? 'primary.main' : 'transparent',
    color: selected ? 'white' : 'text.secondary',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: selected ? 'primary.dark' : 'grey.50',
    },
  }),
} as const;

// ─── Skills Section ───────────────────────────────────────────────────────────

export const skillStyles = {
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 160px 40px',
    gap: 2,
    alignItems: 'flex-start',
    mb: 2,
  } satisfies Sx,

  addButton: {
    mt: 1,
    borderStyle: 'dashed',
  } satisfies Sx,
} as const;

// ─── Infinite Scroll Dropdown ─────────────────────────────────────────────────

export const dropdownStyles = {
  trigger: (open: boolean): Sx => ({
    width: '100%',
    p: 1.5,
    borderRadius: 2,
    border: '1px solid',
    borderColor: open ? 'primary.main' : 'grey.300',
    bgcolor: 'background.paper',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'border-color 0.15s',
    '&:hover': { borderColor: 'primary.main' },
    minHeight: 56,
  }),

  paper: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    zIndex: 1300,
    maxHeight: 320,
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'grey.200',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  } satisfies Sx,

  item: (selected: boolean): Sx => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 2,
    py: 1.5,
    cursor: 'pointer',
    bgcolor: selected ? 'primary.50' : 'transparent',
    borderLeft: selected ? '3px solid' : '3px solid transparent',
    borderColor: selected ? 'primary.main' : 'transparent',
    '&:hover': { bgcolor: 'grey.50' },
    transition: 'all 0.1s',
  }),

  placeholder: {
    color: 'text.secondary',
    fontSize: '0.95rem',
  } satisfies Sx,

  loader: {
    display: 'flex',
    justifyContent: 'center',
    py: 2,
  } satisfies Sx,
} as const;

// ─── Preview Page ─────────────────────────────────────────────────────────────

export const previewStyles = {
  section: {
    mb: 4,
  } satisfies Sx,

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 3,
    pb: 2,
    borderBottom: '2px solid',
    borderColor: 'primary.main',
  } satisfies Sx,

  sectionTitle: {
    fontWeight: 700,
    color: 'primary.main',
  } satisfies Sx,

  grid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: 3,
  } satisfies Sx,

  fieldLabel: {
    fontWeight: 600,
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'text.secondary',
    mb: 0.5,
  } satisfies Sx,

  fieldValue: {
    fontWeight: 500,
    color: 'text.primary',
    fontSize: '0.95rem',
  } satisfies Sx,

  chip: {
    mr: 0.5,
    mb: 0.5,
  } satisfies Sx,

  skillRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 1,
    px: 2,
    bgcolor: 'grey.50',
    borderRadius: 2,
    mb: 1,
  } satisfies Sx,
} as const;
