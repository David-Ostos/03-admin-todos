"use client"

import {  signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";

export const LogoutButton = () => {
  return (
    <div>
      <button
          onClick={async () => signOut()}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer"
        >
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
    </div>
  )
}
