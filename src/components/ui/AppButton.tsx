// src/components/ui/AppButton.tsx
'use client';
import Button, { type ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingLabel?: string;
}

const rootSx = {
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '8px',
};

export function AppButton({
  children,
  isLoading = false,
  loadingLabel,
  disabled,
  sx,
  ...rest
}: AppButtonProps) {
  return (
    <Button
      sx={{ ...rootSx, ...(sx as object) }}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CircularProgress size={16} color="inherit" />
          {loadingLabel ?? children}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
