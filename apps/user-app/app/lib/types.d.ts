import { DefaultSession } from "next-auth";

// overwrite/extend existing schemas from existing module

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
