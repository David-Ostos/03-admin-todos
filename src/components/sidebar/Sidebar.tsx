import Image from "next/image";
import Link from "next/link";
import {SidebarItem, SidebarItemProps} from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
// import {auth} from "@/auth";
import { LoginButton } from "./LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const itemSiderbar: SidebarItemProps[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    title: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
  },
  {
    title: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline size={30} />,
  },
  {
    title: "Productos",
    path: "/dashboard/products",
    icon: <IoBasketOutline size={30} />,
  },{
    title: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatarUrl = (session?.user?.image) 
    ? session?.user?.image :
    "https://i.imgur.com/yhW6Yw1.jpg";

    const userRoles = session?.user?.roles || ['user']; 

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r border-gray-300 shadow-right-only bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div className="pb-4 ">
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <div className="flex gap-2 justify-center items-center">
              <Image
                src="/react.png"
                width={56}
                height={56}
                className="w-14"
                alt="tailus logo"
              />
              <span className="text-xl">Dashboard</span>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center ">
          <Image
            src={avatarUrl}
            alt=""
            width={100}
            height={100}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          {session ? (
            <div>
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block capitalize">
                {session?.user?.name}
              </h5>
              <span className="hidden text-gray-400 lg:block capitalize">
                {userRoles.join(", ")}
              </span>
            </div>
          ) : (
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              Usuario no registrado
            </h5>
          )}
        </div>

        <ul className="space-y-2 tracking-wide mt-8 max-h-[300px] overflow-y-auto">
          {itemSiderbar.map((item) => (
            <li key={item.path}>
              <SidebarItem {...item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-300 cursor-pointer">
        <LoginButton />
      </div>
    </aside>
  );
};
