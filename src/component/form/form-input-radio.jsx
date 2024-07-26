import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputRadio = ({
  name,
  control,
  label,
  options,
  className,
}) => {
  return (
    <FormControl className={className} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RadioGroup value={value} onChange={onChange}>
            {options.map((singleOption) => (
              <FormControlLabel
                value={singleOption.value}
                label={singleOption.label}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
