import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "This is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, {
      message: "Title is to short.",
    }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});
