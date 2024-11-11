import { usePathname } from "next/navigation";
import { BsFillGridFill } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";

const useSideBarMenu = () => {
    const [showCalendar, setShowCalendat] = useState<boolean>(false);
    const {userData} = useUserContext();

    const showCalendarDialog = () => setShowCalendat(true)
    const onCloseCalendar = () => setShowCalendat(false)
  
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
    return {
        showCalendarDialog,
        onCloseCalendar,
        showCalendar,
        menuItems,
        pathname,
        userData,
    }
}

export default useSideBarMenu;