"use client";
import useUserInfo from "@/hooks/useUserInfo";
import TMAvatar from "./TMAvatar";
import { PrimaryButton } from "./TMButton";
import TMCalendar from "./TMCalendar";



const TMInfoSideBar = () => {
    const user = useUserInfo();
    return (
        <div className="py-10 px-4 bg-white my-5 mr-5 rounded-xl flex flex-col gap-10">
            <div className="mx-auto text-center flex flex-col gap-4">
                <TMAvatar style="w-40 h-40" />
                <div>
                    <p className="text-darkBlue font-bold">{user?.name}</p>
                    <p className="text-gray text-sm">{user?.email}</p>
                </div>
                <PrimaryButton type="button" label="My Profile" />
            </div>
            <div>
                <TMCalendar />
            </div>
        </div>
    )
}

export default TMInfoSideBar;