"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TMAvatar from "./TMAvatar";
import { BsFillGridFill } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { ImCalendar } from "react-icons/im";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";
import TMCalendar from "./TMCalendar";

const TMSideBarMenu = () => {
  const [showCalendar, setShowCalendat] = useState<boolean>(false)

  const pathname = usePathname();
  const user = useUserInfo();
  const menuItems = [
    {
      name: "Overview",
      path: `/${user?.userId}/overview`,
      icon: <BsFillGridFill />,
      iconActive: <BsGrid />,
    },
    {
      name: "Tasks",
      path: `/${user?.userId}/tasks`,
      icon: <FaListAlt />,
      iconActive: <FaRegRectangleList />,
    },
    {
      name: "Settings",
      path: `/${user?.userId}/settings`,
      icon: <IoSettings />,
      iconActive: <IoSettingsOutline />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8 w-16 pt-10 bg-blue z-[60]">
        <TMAvatar />
        <div className="w-8 h-8"></div>
        <ImCalendar onClick={() => setShowCalendat((v) => !v)} className="text-white w-8 h-8 mx-auto box md:hidden" />
          {showCalendar && 
          <div onBlur={() => setShowCalendat(false)} className="flex absolute shadow-xl bg-white rounded-lg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <TMCalendar />
          </div>}
      </div>
      <div className="relative">
        <Sheet>
          <div className="absolute -left-12 top-28 z-[60]">
            <SheetTrigger>
              <BsReverseLayoutTextSidebarReverse className="text-white w-8 h-8" />
            </SheetTrigger>
          </div>
          <SheetContent
            side="left"
            className="w-[200px] sm:w-[200px] max-w-[200px] ml-16 pl-0 max-h-[100vh] pt-10"
          >
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.path} className="relative">
                  <Link
                    href={item.path}
                    // onClick={(e) => handleClick(e, item.path)}
                    className={`flex items-center gap-1 py-2 px-4 rounded hover:bg-gray-50 ${
                      pathname.includes(item.path)
                        ? "text-blue font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {pathname.includes(item.path) ? item.icon : item.iconActive}
                    {item.name}
                  </Link>
                  {pathname.includes(item.path) && (
                    <span
                      className="
                  absolute 
                  left-0 
                  top-1/2 
                  transform -translate-y-1/2 h-0 w-0 
                  border-t-8 
                  border-b-8 
                  border-l-8 
                  border-transparent 
                  border-l-blue"
                    ></span>
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default TMSideBarMenu;
