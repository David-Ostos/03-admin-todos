"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {CiShoppingBasket} from "react-icons/ci";

interface Props {
  totalItems: number;
}

export const CartTopMenu = ({totalItems}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href="/dashboard/cart"
      className={`p-2 flex items-center justify-center  h-10 rounded-xl border  focus:bg-gray-100 active:bg-gray-200
        ${pathname === "/dashboard/cart" ? 'border-blue-500 bg-blue-200' : 'border-gray-300 bg-gray-100'}
      `}
    >
      {totalItems > 0 && (
        <span className="text-sm mr-2 text-blue-700 font-bold">
          {totalItems}
        </span>
      )}
      <CiShoppingBasket size={25} />
    </Link>
  );
};
