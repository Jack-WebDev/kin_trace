import type { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => (resource: any) => {
  try {
    schema.parse({ resource });
  } catch (error) {
    return error;
  }
};
