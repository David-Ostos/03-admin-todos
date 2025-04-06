"use client";

import {signIn, signOut, useSession} from "next-auth/react";
import {CiLogin, CiLogout} from "react-icons/ci";
import {IoShieldOutline} from "react-icons/io5";

export const LoginButton = () => {
  const { status } = useSession();

  switch (status) {
    case "loading":
      return (
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer">
          <IoShieldOutline />
          <span className="group-hover:text-gray-700">Espere...</span>
        </button>
      );
    case "unauthenticated":
      return (
        <button
          onClick={async () => signIn()}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer"
        >
          <CiLogin />
          <span className="group-hover:text-gray-700">Login</span>
        </button>
      );
    case "authenticated":
      return (
        <button
          onClick={async () => signOut()}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer"
        >
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      );

    default:
      break;
  }
};
