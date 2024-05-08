import type { z } from "zod";
import type { Control, UseFormRegisterReturn } from "react-hook-form";
import type { FormSchema } from "./schema";

export type FormValues = z.infer<typeof FormSchema>;

export interface FormFields {
  ({ control }: { control: Control<z.infer<typeof FormSchema>> }): JSX.Element;
}

export interface StampsField {
  ({
    control,
    stampsRef,
  }: {
    control: Control<z.infer<typeof FormSchema>>;
    stampsRef: UseFormRegisterReturn<"stamps">;
  }): JSX.Element;
}
