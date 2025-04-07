// import {auth} from "@/auth";
import {WidgetItem} from "@/components";
import {getServerSession} from "next-auth";
import Image from "next/image";
import {redirect} from "next/navigation";
import {authOptions} from "../api/auth/[...nextauth]/route";
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

  if (!session) {
    redirect("api/auth/signin");
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* <SignIn/>
      <SignOut/> */}
      {/* {items.map((item) => (
        <WidgetItem key={item.title} {...item} />
      ))} */}
      {session ? (
        <WidgetItem title="Usuario conectado S-Side">
          <div className="flex flex-col justify-center items-center gap-2">
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
            <div className=" flex flex-col justify-center items-center gap-2 font-semibold">
              <p className="capitalize text-sm">
                <span className="font-bold text-gray-800">name: </span>
                {session?.user?.name}
              </p>
              <p className="capitalize text-sm">
                <span className="font-bold text-gray-800">email: </span>
                {session?.user?.email}
              </p>
              <p className="capitalize text-sm">
                <span className="font-bold text-gray-800">roles: </span>
                {session?.user?.roles?.join(", ")}
              </p>
              <p className="capitalize text-sm text-center">
                <span className="font-bold text-gray-800">id: </span>
                {session?.user?.id}
              </p>
            </div>
          </div>
        </WidgetItem>
      ) : (
        <WidgetItem title="Usuario desconectado S-Side">
          <div className="flex flex-col justify-center items-center gap-2 font-semibold"></div>
        </WidgetItem>
      )}
    </div>
  );
}
