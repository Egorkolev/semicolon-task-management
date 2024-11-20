"use client";
import React from "react";
import { SecondaryButton, YellowButton } from "../../customComponents/TMButton";
import { TMFrame } from "../../customComponents/TMFrame";
import { FaGithub } from "react-icons/fa";
import { styles} from "@/styles/tailwindClasses";
import WorkspaceForm from "./workspaceForm";
import { useRouter } from "../../../../i18n/routing";
import TMLanguageSelect from "../../customComponents/TMLanguageSelect";

const Layout = () => {
    const router = useRouter()
    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
    }

    return (
        <div className={styles.formWrapper}>
            <div className={styles.outsideForm}>
                <WorkspaceForm />
            </div>
            <TMFrame childeren={
                <>  
                    <div className="flex justify-between items-center gap-1">
                       <SecondaryButton onClick={handleLogOut} type="button" label="Log Out" /> 
                       <TMLanguageSelect className="bg-white" />
                    </div>
                    <h1 className="text-start text-6xl font-bold text-white hidden md:block ">Your Enviroment your Will.</h1>
                    <div className={styles.frameForm} >
                        <WorkspaceForm />
                    </div>
                    <a className="text-infoBlue" href="/https://github.com/Egorkolev/semicolon-task-management" target="_blank">
                        <YellowButton type="button"><FaGithub className="mr-2" /> GitHub code review</YellowButton>
                    </a>
                </>
            } />
        </div>
    );
};

export default Layout;