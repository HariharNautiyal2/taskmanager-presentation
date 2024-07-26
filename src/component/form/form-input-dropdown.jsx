import { FormControl, InputLabel, MenuItem, Select, FormLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputDropdown = ({ name, control, label, options, className }) => {
  return (
    <FormControl fullWidth margin="normal" className={className}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              size="small"
              value={value}
              onChange={onChange}
              error={!!error}
              variant="outlined"
              fullWidth
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? 'red' : '#582498',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? 'red' : '#3f196e',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? 'red' : '#3f196e',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <Typography variant="caption" color="red" sx={{ mt: 1 }}>
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </FormControl>
  );
};
