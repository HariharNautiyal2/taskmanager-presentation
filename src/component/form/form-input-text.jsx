import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

export const FormInputText = ({ name, control, label, className }) => {
  return (
    <FormControl fullWidth margin="normal" className={className}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              variant="outlined"
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
            />
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
