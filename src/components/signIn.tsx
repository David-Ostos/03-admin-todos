import { signIn,signOut, auth } from "@/auth";

export async function SignIn() {
  const auth1 = await auth() 
  console.log(auth1?.user?.image)
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit">Iniciar sesión con GitHub</button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Cerrar sesión con GitHub</button>
    </form>
  );
}