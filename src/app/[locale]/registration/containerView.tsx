import { PrimaryButton, SecondaryButton } from "@/customComponents/TMButton";
import TMLanguageSelect from "@/customComponents/TMLanguageSelect";
import ThemeToggle from "@/customComponents/ThemeToggle";
import { TMFrame } from "@/customComponents/TMFrame";
import RegistrationForm from "./RegistrationFotm";
import { styles } from "@/styles/tailwindClasses";
import { Link } from "../../../i18n/routing";
import { useTranslations } from "next-intl";
import { RegisterFormProps } from "./types";
import { FaGithub } from "react-icons/fa";
import React from "react";
import SpotlightCard from "@/lib/styles/SpotlightCard/SpotlightCard";

const ContainerView: React.FC<RegisterFormProps> = (props) => {
    const t = useTranslations("button");
    return (
        <div className={styles.formWrapper}>
            <TMFrame childeren={
                <>
                    <div className="flex justify-between items-center gap-1">
                        <TMLanguageSelect />
                        <ThemeToggle />
                    </div>
                    <h1 className="text-start text-6xl font-bold text-white dark:text-gray hidden md:block ">Take your productivity to the next level.</h1>
                    <div className="flex justify-between items-center gap-1">
                        <a className="text-infoBlue" href="https://github.com/Egorkolev/semicolon-task-management" target="_blank">
                            <PrimaryButton type="button"><FaGithub className="mr-2" /> GitHub code review</PrimaryButton>
                        </a>
                        <Link href="/login">
                            <SecondaryButton label={t("logIn")} />
                        </Link> 
                    </div>
                </>

            } />
            <div className={styles.outsideForm}>
                <SpotlightCard className="custom-spotlight-card p-5" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <RegistrationForm {...props} />
                </SpotlightCard>
            </div>
        </div>
    );
};

export default ContainerView;