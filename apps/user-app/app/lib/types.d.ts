import nextAuth, { DefaultSession } from "next-auth";

// overwrite/extend existing schemas from existing module

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
