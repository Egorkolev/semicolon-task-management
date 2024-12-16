import { usePathname, useRouter } from "@/i18n/routing";
import { BsFillGridFill } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useTranslations } from "next-intl";

const useSideBarMenu = () => {
    const t = useTranslations("nav")
    const [showCalendar, setShowCalendat] = useState<boolean>(false);
    const {userData} = useUserContext();

    const showCalendarDialog = () => setShowCalendat(true)
    const onCloseCalendar = () => setShowCalendat(false)
  
    const pathname = usePathname();
    const user = useUserInfo();
    const router = useRouter()

    const handleLogOut = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
  }

    const menuItems = [
      {
        name: t("overview"),
        path: `/${user?.userId}/overview`,
        icon: <BsFillGridFill />,
        iconActive: <BsGrid />,
      },
      {
        name: t("tasks"),
        path: `/${user?.userId}/tasks`,
        icon: <FaListAlt />,
        iconActive: <FaRegRectangleList />,
      },
      {
        name: t("settings"),
        path: `/${user?.userId}/settings`,
        icon: <IoSettings />,
        iconActive: <IoSettingsOutline />,
      },
    ];
    return {
        showCalendarDialog,
        onCloseCalendar,
        handleLogOut,
        showCalendar,
        menuItems,
        pathname,
        userData,
    }
}

export default useSideBarMenu;