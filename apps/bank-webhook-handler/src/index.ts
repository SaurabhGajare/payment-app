import { onRampTxnUser, onRampTxnUserSchema } from "@repo/schemas/types";
import express, { Request, Response } from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", (req: Request, res: Response) => {
  const isSchemaValid = onRampTxnUserSchema.safeParse(req.body);

  if (!isSchemaValid.success) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  const paymentInformation: onRampTxnUser = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.json({
      message: "captured",
    });
  } catch (error) {
    console.error(error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
