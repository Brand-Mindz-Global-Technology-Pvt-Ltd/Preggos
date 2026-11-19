import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .required("Username is required"),

  email: Yup.string()
    .trim()
    .lowercase()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  acceptTerms: Yup.boolean().oneOf(
    [true],
    "Please accept the Terms & Conditions"
  ),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
