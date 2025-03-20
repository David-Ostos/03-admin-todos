"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import {CiBookmarkCheck} from "react-icons/ci";

export interface SidebarItemProps {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

export const SidebarItem = ({title: name, path, icon}: SidebarItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gradient-to-r hover:bg-sky-600 to-cyan-400 hover:text-white ${
        pathname === path
          ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
          : ""
      }`}
    >
      {icon ? icon : <CiBookmarkCheck size={40} />}

      <span className="-mr-1 font-medium">{name}</span>
    </Link>
  );
};
