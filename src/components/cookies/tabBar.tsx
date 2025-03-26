"use client"

import { setCookie } from "cookies-next";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}


export const TabBar = ({tabOptions = [1,2,3,4], currentTab = 1}:Props) => {

  const [selected, setSelected] = useState(currentTab);

  const onTabSelecter = (tab:number) =>{
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
  }

  let gridColsClass = "";
  switch(tabOptions.length) {
    case 1: gridColsClass = "grid-cols-1"; break;
    case 2: gridColsClass = "grid-cols-2"; break;
    case 3: gridColsClass = "grid-cols-3"; break;
    case 5: gridColsClass = "grid-cols-5"; break;
    case 6: gridColsClass = "grid-cols-6"; break;
    case 7: gridColsClass = "grid-cols-7"; break;
    case 8: gridColsClass = "grid-cols-8"; break;
    case 9: gridColsClass = "grid-cols-9"; break;
    default: gridColsClass = "grid-cols-4"; // Valor por defecto
  }

  return (
    <div
      className={`
      grid w-full space-x-2 rounded-xl bg-gray-200 p-2
      ${gridColsClass}
      `}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelecter(tab)}
            className="transition-all duration-300 ease-in-out block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
}