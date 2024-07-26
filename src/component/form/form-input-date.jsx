import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export const FormInputDate = ({ name, control, label, className }) => {
  return (
    <FormControl fullWidth margin="normal" className={className}>
      <FormLabel>{label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              value={value ? dayjs(value) : value}
              onChange={(date) => {
                onChange(date.toDate());
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error ? error.message : null}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};
