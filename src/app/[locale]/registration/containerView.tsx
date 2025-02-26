import React from "react";
import { SecondaryButton, YellowButton } from "@/customComponents/TMButton";
import { TMFrame } from "@/customComponents/TMFrame";
import RegistrationForm from "./RegistrationFotm";
import { styles } from "@/styles/tailwindClasses";
import { FaGithub } from "react-icons/fa";
import { Link } from "../../../i18n/routing";
import { useTranslations } from "next-intl";
import TMLanguageSelect from "@/customComponents/TMLanguageSelect";
import ThemeToggle from "@/customComponents/ThemeToggle";
import { RegisterFormProps } from "./types";

const ContainerView: React.FC<RegisterFormProps> = (props) => {
    const t = useTranslations("button");
    return (
        <div className={styles.formWrapper}>
            <TMFrame childeren={
                <>
                    <div className="flex justify-between items-center gap-1">
                        <TMLanguageSelect className="bg-white dark:bg-blue dark:text-gray dark:border-none dark:shadow-lg dark:shadow-gray" />
                        <ThemeToggle />
                    </div>
                    <h1 className="text-start text-6xl font-bold text-white dark:text-gray hidden md:block ">Take your productivity to the next level.</h1>
                    <div className="flex justify-between items-center gap-1">
                        <a className="text-infoBlue" href="https://github.com/Egorkolev/semicolon-task-management" target="_blank">
                            <YellowButton type="button"><FaGithub className="mr-2" /> GitHub code review</YellowButton>
                        </a>
                        <Link href="/login">
                            <SecondaryButton className="dark:shadow-lg dark:shadow-gray" type="button" label={t("logIn")} />
                        </Link> 
                    </div>
                </>

            } />
            <div className={styles.outsideForm}>
                <RegistrationForm {...props} />
            </div>
        </div>
    );
};

export default ContainerView;