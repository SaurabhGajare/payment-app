import z from "zod";

export const userLoginSchema = z.object({
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits long" })
    .regex(/^\d{10}$/, { message: "Phone number can only contain digits" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least of 1 characters" }),
});

export type userLoginInput = z.infer<typeof userLoginSchema>;
