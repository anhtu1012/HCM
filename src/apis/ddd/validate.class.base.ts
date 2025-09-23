import { ZodError, ZodSchema } from "zod";
import { ServiceResponse } from "./serviceResponse";

export class ValidateBaseClass {
  static async validate<T extends object>(
    formData: T,
    typeForm: ZodSchema,
    isFormatMessage = true
  ) {
    try {
      await typeForm.parse(formData);
    } catch (err) {
      let errorMessage = "";
      if (!isFormatMessage)
        errorMessage = `Invalid input: ${(err as ZodError).errors
          .map((e) => e.message)
          .join(", ")}`;
      else
        errorMessage = `Invalid: ${(err as ZodError).errors
          .map((e) => `${e.path.at(-1)} is ${e.message}`)
          .join(", ")}`;
      const serviceResponse = ServiceResponse.failure(errorMessage, null);
      throw serviceResponse;
    }
  }
}
