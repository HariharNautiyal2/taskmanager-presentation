import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";

export const FormInputTextarea = ({ name, control, label, className }) => {
  return (
    <FormControl fullWidth margin="normal" className={className}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextareaAutosize
              minRows={5}
              onChange={onChange}
              value={value}
              className="textarea-input"
              style={{
                width: "100%",
                borderColor: error ? "red" : "#582498",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "4px",
                padding: "8px",
                outline: "none",
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
