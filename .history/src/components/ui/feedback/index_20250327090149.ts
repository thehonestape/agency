export { Alert, alertVariants } from "./alert";
export { Toast, ToastProvider, ToastTitle, ToastDescription, ToastAction } from "./toast";

// Semantic feedback composition
export const Feedback = {
  Alert,
  Toast,
} as const; 