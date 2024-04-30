import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { userLoginSchema } from "@repo/schemas/types";
import { AuthOptions, Session } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone",
          type: "text",
          placeholder: "Enter your number...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { success } = userLoginSchema.safeParse(credentials);
        if (!success) {
          return null;
        }

        const { phone, password } = userLoginSchema.parse(credentials);
        // const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              phone: existingUser?.number,
              name: existingUser?.name,
              email: existingUser?.email,
            };
          }

          return null;
          // return new Error('Invalid Credentials');
        }

        // create user
        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await db.user.create({
            data: {
              number: phone,
              password: hashedPassword,
              email: "",
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            phone: user.number,
          };
        } catch (error) {
          console.error(error);
          return null;
        }

        // return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      session.user.id = token.sub || "";
      return session;
    },
  },
};
