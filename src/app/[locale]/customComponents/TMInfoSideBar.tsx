"use client";
import TMAvatar from "./TMAvatar";
import { PrimaryButton } from "./TMButton";
import TMCalendar from "./TMCalendar";
import { useUserContext } from "@/context/UserContext";
import PhotoFrame from "../public/photo.png";
import Image from "next/image";
import { useState } from "react";
import TMAvatarDialog from "./TMAvatarDialog";
import useOverview from "../[userId]/overview/useOverview";
import TMToast from "./TMToast";
import { useTranslations } from "next-intl";

const TMInfoSideBar = () => {
    const t = useTranslations("button");
    const {handleUploadFile, handleFileChange, closeDialog, openDialog, showAvatarDialog, responseData, showToast, isUploading} = useOverview();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const {userData} = useUserContext();
    
    return (
        <div className="py-10 px-4 bg-white my-5 mr-5 rounded-xl flex flex-col gap-10">
            <div className="mx-auto text-center flex flex-col gap-4">
                <div 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative"
                >
                    <TMAvatar key={userData?.userImg} logo={userData?.userImg} style="w-40 h-40" />
                    <Image 
                        className={`cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 duration-300 ${isHovered ? 'opacity-100' : 'opacity-0' }`} 
                        src={PhotoFrame} 
                        alt="PhotoFrame" 
                        onClick={openDialog}
                    />
                </div>
                <div>
                    <p className="text-darkBlue font-bold">{userData?.name}</p>
                    <p className="text-gray text-sm">{userData?.email}</p>
                </div>
                <PrimaryButton type="button" label={t("myProfile")} />
            </div>
            <div>
                <TMCalendar />
            </div>
            <TMToast response={responseData} trigger={showToast} />
            {showAvatarDialog && 
                <TMAvatarDialog 
                isUploading={isUploading}
                key={userData?.userImg}
                userImage={userData?.userImg} 
                onChange={handleFileChange} 
                onUpload={handleUploadFile} 
                onClose={closeDialog} 
                showAvatarDialog={showAvatarDialog} 
            />
            }
        </div>
    )
}

export default TMInfoSideBar;