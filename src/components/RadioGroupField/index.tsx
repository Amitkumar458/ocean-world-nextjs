import { RadioGroup, FormControl, FormControlLabel, Radio, FormLabel, FormHelperText } from "@mui/material";
import { useField } from "formik";
import useColors from "../../hooks/useColors";

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
  row?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string | number) => void;
}

export const RadioGroupField = ({
  name,
  label,
  options,
  row = true,
  required = false,
  onChange,
}: RadioGroupFieldProps) => {
  const colors = useColors();
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    helpers.setValue(value);
    onChange?.(event, value);
  };

  return (
    <FormControl component="fieldset" error={meta.touched && Boolean(meta.error)}>
      <FormLabel component="legend" required={required} style={{ fontWeight: "bold" , color:'black' }}>
        {label}
      </FormLabel>
      <RadioGroup
        row={row}
        name={name}
        value={field.value}
        onChange={handleChange}
        sx={{
          "& .MuiRadio-root": {
            color: `${colors.greenAccent[400]}`,
          },
          "& .MuiRadio-root.Mui-checked": {
            color: `${colors.greenAccent[600]}`,
          },
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio/>}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
    </FormControl>
  );
};
