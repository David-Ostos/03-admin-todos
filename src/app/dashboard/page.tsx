// import {auth} from "@/auth";
import {WidgetItem} from "@/components";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
/* import {SignIn, SignOut} from "@/components/signIn";

const items = [
  {
    title: "Global Activities",
    price: "23,988",
    Percentage: "2",
    compare: "13,988",
  },
  {
    title: "Global Activities",
    price: "23,988",
    Percentage: "2",
    compare: "13,988",
  },
]; */

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("api/auth/signin");
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* <SignIn/>
      <SignOut/> */}
      {/* {items.map((item) => (
        <WidgetItem key={item.title} {...item} />
      ))} */}
{
  session ? (

      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col justify-center items-center gap-2 font-semibold" >
        {session?.user?.image ? (
          <div className="rounded-xl">
            <Image
            className="rounded-xl"
            src={session.user.image}
            alt="User Image"
            width={100}
            height={100}
          />
          </div>
        ) : (
          <p>Imagen no disponible</p>
        )}
        <p className="">{session?.user?.name}</p>
        <p className="">{session?.user?.email}</p>
        </div>
      </WidgetItem>
  ) : (
  <WidgetItem title="Usuario desconectado S-Side">
        <div className="flex flex-col justify-center items-center gap-2 font-semibold" >
        </div>
      </WidgetItem>
)
}
    </div>
  );
}
