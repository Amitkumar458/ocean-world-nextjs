import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import useColors from "../../hooks/useColors";
import { FormikErrors,FormikTouched } from "formik";
import { StringOrNumber } from "../../types/common";

type FormFields = {
  [key:string]:StringOrNumber
}
interface Props extends Omit<DatePickerProps<Dayjs>, "onChange" | "value"|"errors"|"name"> {
  value: string|undefined;
  onChange?: (val: string) => void;
  errors?: FormikErrors<FormFields>;
  touched?: FormikTouched<FormFields>;
  name: string;
}

const DatePickerComp = ({ value, onChange, sx,errors,touched,name, ...props }: Props) => {
  const colors = useColors();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Controlled picker"
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          const date = `${newValue?.year()}-${
            Number(newValue?.month()!) + 1
          }-${newValue?.date()}`;
          onChange && onChange(date);
        }}
        {...props}
        sx={{
          width: "100%",
          padding: "0px",
          margin: "0px",
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
          "& .MuiInputLabel-root.Mui-disabled": {
            color: `${colors.grey[300]} !important`,
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
          },
          ...sx,
        }}
        slotProps={{
          textField: {
            size: "small",
            error:
              errors && touched
                ? !!touched[`${name}`] && !!errors[`${name}`]
                : undefined,
            helperText:
              errors && touched ? touched[`${name}`] && errors[`${name}`] : "",
          },
        }}
        name={name}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComp;
