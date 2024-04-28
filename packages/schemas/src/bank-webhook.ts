import z from "zod";

export const onRampTxnUserSchema = z.object({
  token: z
    .string({
      required_error: "token is required",
      invalid_type_error: "token must be a string",
    })
    .min(1, { message: "token not provided" }),

  userId: z
    .string({
      required_error: "userId is required",
      invalid_type_error: "userId must be a string",
    })
    .min(1, { message: "userId not provided" }),

  amount: z
    .string({
      required_error: "amount is required",
    })
    .min(1, { message: "amount not provided" }),

  // amount: z
  //   .number({
  //     required_error: "amount is required",
  //     invalid_type_error: "amount must be a number",
  //   })
  //   .int({ message: "amount must be integer" })
  //   .positive({ message: "amount must be a positive number" }),
});

export type onRampTxnUser = z.infer<typeof onRampTxnUserSchema>;

//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount
