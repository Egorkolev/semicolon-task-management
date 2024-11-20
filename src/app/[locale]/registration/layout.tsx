"use client";
import React from "react";
import { SecondaryButton, YellowButton } from "../customComponents/TMButton";
import { TMFrame } from "../customComponents/TMFrame";
import RegistrationForm from "./RegistrationFotm";
import { styles } from "@/styles/tailwindClasses";
import { FaGithub } from "react-icons/fa";
import { Link } from "../../../i18n/routing";
import { useTranslations } from "next-intl";
import TMLanguageSelect from "../customComponents/TMLanguageSelect";

const Layout = () => {
    const t = useTranslations("button");
    return (
        <div className={styles.formWrapper}>
            <TMFrame childeren={
                <>
                    <div className="flex justify-between items-center gap-1">
                        <TMLanguageSelect className="bg-white" />
                        <Link href="/login">
                            <SecondaryButton type="button" label={t("logIn")} />
                        </Link> 
                    </div>
                    <h1 className="text-start text-6xl font-bold text-white hidden md:block ">Take your productivity to the next level.</h1>
                    <div className={styles.frameForm} >
                        <RegistrationForm />
                    </div>
                    <a className="text-infoBlue" href="/https://github.com/Egorkolev/semicolon-task-management" target="_blank">
                        <YellowButton type="button"><FaGithub className="mr-2" /> GitHub code review</YellowButton>
                    </a>
                </>

            } />
            <div className={styles.outsideForm}>
                <RegistrationForm />
            </div>
        </div>
    );
};

export default Layout;