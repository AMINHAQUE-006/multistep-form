import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { previewStyles as styles } from '@/styles/formStyles';


function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Box sx={styles.sectionHeader}>
      <Box sx={{ color: 'primary.main' }}>{icon}</Box>
      <Typography variant="h6" sx={styles.sectionTitle}>
        {title}
      </Typography>
    </Box>
  );
};

export default SectionHeader;