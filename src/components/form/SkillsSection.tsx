'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { Step2FormValues } from '@/components/steps/Step2';
import { AppTextField } from '@/components/ui/AppTextField';
import { AppButton } from '@/components/ui/AppButton';
import { skillStyles as styles } from '@/styles/formStyles';

export function SkillsSection() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<Step2FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const skillErrors = errors.skills;

  return (
    <Box>
      {fields.map((field, index) => (
        <Box key={field.id} sx={styles.row}>
          {/* Skill Name */}
          <AppTextField
            label="Skill Name"
            placeholder="e.g. React, Python, Design..."
            error={
              Array.isArray(skillErrors) && skillErrors[index]?.skillName?.message
                ? skillErrors[index]?.skillName?.message
                : undefined
            }
            {...register(`skills.${index}.skillName`)}
          />

          {/* Years of Experience */}
          <AppTextField
            label="Years"
            type="number"
            inputProps={{ min: 0, max: 50 }}
            error={
              Array.isArray(skillErrors) && skillErrors[index]?.yearsOfExperience?.message
                ? skillErrors[index]?.yearsOfExperience?.message
                : undefined
            }
            {...register(`skills.${index}.yearsOfExperience`, { valueAsNumber: true })}
          />

          {/* Remove button (disabled if only one skill left) */}
          <IconButton
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            color="error"
            aria-label="Remove skill"
            sx={{ mt: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      {/* Array-level error (e.g. "Add at least one skill") */}
      {!Array.isArray(skillErrors) && skillErrors?.message && (
        <FormHelperText error sx={{ mb: 1, ml: 1 }}>
          {skillErrors.message as string}
        </FormHelperText>
      )}

      {/* Add Skill button */}
      <AppButton
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => append({ skillName: '', yearsOfExperience: '' as unknown as number })}
        sx={styles.addButton}
      >
        Add Skill
      </AppButton>
    </Box>
  );
}
