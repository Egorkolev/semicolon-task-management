"use client";
import TMAvatar from "./TMAvatar";
import { PrimaryButton } from "./TMButton";

const TMInfoSideBar = () => {
    return (
        <div className="py-10 px-4 bg-white my-5 mr-5 rounded-xl">
            <div className="mx-auto text-center flex flex-col gap-4">
                <TMAvatar style="w-40 h-40" />
                <div>
                    <p className="text-darkBlue font-bold">Egor Kolev</p>
                </div>
                <PrimaryButton type="button" label="My Profile" />
            </div>
            <div>

            </div>
        </div>
    )
}

export default TMInfoSideBar;