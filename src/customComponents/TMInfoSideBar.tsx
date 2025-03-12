"use client";

import SpotlightCard from "@/lib/styles/SpotlightCard/SpotlightCard";
import { useFileContext } from "@/context/FileUploadContext";
import { useUserContext } from "@/context/UserContext";
import useUserInfo from "@/hooks/useUserInfo";
import TMAvatarDialog from "./TMAvatarDialog";
import { useTranslations } from "next-intl";
import PhotoFrame from "@/public/photo.png";
import { PrimaryButton } from "./TMButton";
import TMCalendar from "./TMCalendar";
import TMAvatar from "./TMAvatar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StarBorder from "@/lib/styles/StarBorder/StarBorder";

const TMInfoSideBar = () => {
    const t = useTranslations("button");
    const {handleUploadFile, handleFileChange, closeDialog, openDialog, showAvatarDialog, isUploading} = useFileContext();
    const {userData} = useUserContext();
    const user = useUserInfo();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    
    return (
        <div className="my-5 mr-5">
            <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="bg-white dark:bg-neutral-700 rounded-sm flex flex-col gap-10 h-full px-4 py-10">
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
                        <p className="text-darkBlue dark:text-gray font-bold">{userData?.name}</p>
                        <p className="text-gray text-sm">{userData?.email}</p>
                    </div>
                    <Link className="text-infoBlue" href={`/${user?.userId}/settings`}>
                    <StarBorder
                        as="button"
                        className="custom-class ml-auto rounded-sm"
                        color="cyan"
                        speed="6s"
                    >
                        <PrimaryButton label={t("myProfile")} />
                    </StarBorder>
                    </Link>
                </div>
                <div>
                    <TMCalendar />
                </div>
                {showAvatarDialog && <TMAvatarDialog 
                    isUploading={isUploading}
                    key={userData?.userImg}
                    userImage={userData?.userImg} 
                    onChange={handleFileChange} 
                    onUpload={handleUploadFile} 
                    onClose={closeDialog} 
                    showAvatarDialog={showAvatarDialog} 
                />}
            </div>
            </SpotlightCard>

        </div>
    )
}

export default TMInfoSideBar;