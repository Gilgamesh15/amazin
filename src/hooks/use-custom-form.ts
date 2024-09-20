import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

// Create a Context for the form
export const FormContext = createContext<UseFormReturn | null>(null);
