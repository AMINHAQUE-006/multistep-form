import { Box, Typography } from "@mui/material";
import { previewStyles as styles } from '@/styles/formStyles';

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box>
      <Typography sx={styles.fieldLabel}>{label}</Typography>
      <Typography sx={styles.fieldValue}>{value || '—'}</Typography>
    </Box>
  );
}

export default Field;