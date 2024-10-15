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




const TMSideBarMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", path: "/overview", icon: <BsFillGridFill />, iconActive: <BsGrid /> },
    { name: "Tasks", path: "/tasks", icon: <FaListAlt />, iconActive: <FaRegRectangleList /> },
    { name: "Settings", path: "/settings", icon: <IoSettings />, iconActive: <IoSettingsOutline /> },
  ];

  return (
    <>
      <div className="w-16 py-10 bg-blue">
        <TMAvatar  />
      </div>
      <aside className="bg-white text-black py-10 pr-10">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path} className="relative">
              <Link
                href={item.path}
                className={`flex items-center gap-1 py-2 px-4 rounded hover:bg-gray-50 ${
                  pathname.match(item.path) ? "text-blue font-bold" : "text-gray-700"
                }`}
              >
                {pathname.match(item.path) ? item.icon : item.iconActive}
                {item.name}
              </Link>
              {pathname.match(item.path) && (
                <span className="
                  absolute 
                  left-0 
                  top-1/2 
                  transform -translate-y-1/2 h-0 w-0 
                  border-t-8 
                  border-b-8 
                  border-l-8 
                  border-transparent 
                  border-l-blue">
                </span>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>

  );
};

export default TMSideBarMenu;
