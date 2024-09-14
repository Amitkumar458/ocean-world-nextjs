import * as yup from "yup";
import { StringOrNumber, AutocompleteOption } from "../types/common";

const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]+[1-9A-Z]}+Z[0-9A-Z]+$/;
// Custom test to ensure the object has at least one key-value pair

const AutocompleteOptionSchema = yup.object().shape({
  id: yup.mixed<StringOrNumber>()
    .required("ID is required")
    .test(
      "is-string-or-number",
      "ID must be a string or number",
      (value) => typeof value === "string" || typeof value === "number"
    ),
});

const AutocompleteSchema = yup
  .mixed<AutocompleteOption>()
  .nullable()
  .test(
    "is-valid-option",
    "Must be a valid option",
    (value) => value === null || AutocompleteOptionSchema.isValidSync(value)
  )
  .required("Select valid option");
  
  const AutocompleteSchemaWithNull = yup
  .mixed<AutocompleteOption>()
  .nullable()
  .test(
    "is-valid-option",
    "Must be a valid option",
    (value) => value === null || AutocompleteOptionSchema.isValidSync(value)
  );
  
  

const nameSchema = yup
  .string()
  .min(2, "Name is too short!")
  .max(50, "Name is too long!");
  
const hospitalNameScheam = yup
  .string()
  .min(2, "Hospital name is too short!")
  .max(100, "Hospital name is too long!");

const emailSchema = yup
  .string()
  .email("Invalid email")
  .required("Email is missing");

const passwordSchema = yup.string().min(8, "Password is too short!");

const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref("password"), undefined], "Passwords must match");

const mobileNumberSchema = yup
  .string()
  .matches(/^[6789]\d{9}$/, "Invalid Contact").required("Contact missing");

const mobileNumberSchemaNotRequired = yup
  .string()
  .matches(/^[6789]\d{9}$/, "Invalid Contact");
  
const aletMobileNumberSchema = yup
  .string()
  .matches(/^[6789]\d{9}$/, "Invalid Contact");

const panNumberSchema = yup
  .string().required("PAN No missing")
  .matches(/^[A-Z]{5}\d{4}[A-Z]$/, "Invalid PAN Number");

const pincodeSchema = yup.string().matches(/^[1-9]\d{5}$/, "Invalid PIN code");

const upiSchema = yup
  .string()
  .matches(/^[a-zA-Z0-9.\\-]{2,256}@[a-zA-Z]{2,64}$/, "Invalid UPI ID");

const addressSchema = yup
  .string()
  .min(5, "Address is too short!")
  .max(100, "Address is too long!");

const dobSchema = yup
  .date()
  .nullable()
  .transform((curr, orig) => (orig === "" ? null : curr))
  .required("Date of Birth is required")
  .test("age", "Invalid date of birth", (value) => {
    if (!value) return false; // Pass the test if the value is null or undefined
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(value).getFullYear();
    return currentYear - birthYear >= 0;
  })
  .test(
    "age-max",
    "Date of Birth cannot be greater than 100 years",
    (value) => {
      if (!value) return false; // Pass the test if the value is null or undefined
      const currentYear = new Date().getFullYear();
      const birthYear = new Date(value).getFullYear();
      return currentYear - birthYear <= 100;
    }
  )
  .max(new Date(), "Date of Birth cannot be in the future");
  
  
const ageSchema = yup.number()
  .typeError("Age must be a number")
  .integer("Age must be an integer")
  .min(1, "Age must be at least 1")
  .max(110, "Age can only be at most 110");

const NumberSchema = yup
  .number()
  .typeError("It must be a number")
  .integer("It must be an integer");

const telephoneSchema = yup
  .string()
  .matches(/^(\+\d{1,2}\s?)?(\d{10})$/, "Invalid telephone number");
  
  
const bankNameSchema = yup
  .string()
  .min(2, "Bank name is too short!")
  .max(50, "Bank name is too long!");

const bankAccounNoSchema = yup
  .string()
  .matches(
    /^\d{10,18}$/,
    "Bank account number must be between 10 and 18 digits"
);
  
const gstSchema = yup.string().matches(gstRegex, "Invalid GST number format");

const ifscCodeSchema = yup
  .string()
  .matches(/^[A-Za-z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format");
  
export {
  nameSchema,
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
  mobileNumberSchema,
  panNumberSchema,
  addressSchema,
  pincodeSchema,
  upiSchema,
  dobSchema,
  AutocompleteSchema,
  aletMobileNumberSchema,
  ageSchema,
  hospitalNameScheam,
  NumberSchema,
  telephoneSchema,
  bankNameSchema,
  bankAccounNoSchema,
  ifscCodeSchema,
  gstSchema,
  AutocompleteSchemaWithNull,
  mobileNumberSchemaNotRequired,
};
