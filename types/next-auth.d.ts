// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    roles?: string[]; // Agrega la propiedad 'roles' al tipo User
    isActive?: boolean; // Agrega la propiedad '
  }

  interface Session {
    user: User; // Asegúrate de que Session use el tipo extendido de User
  }
}