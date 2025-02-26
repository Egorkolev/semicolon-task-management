import React from "react";
import { SecondaryButton, YellowButton } from "@/customComponents/TMButton";
import { TMFrame } from "@/customComponents/TMFrame";
import LoginForm from "./LoginForm";
import { FaGithub } from "react-icons/fa";
import { styles} from "@/styles/tailwindClasses";
import { Link } from "../../../i18n/routing";
import TMLanguageSelect from "@/customComponents/TMLanguageSelect";
import { useTranslations } from "next-intl";
import ThemeToggle from "@/customComponents/ThemeToggle";
import { LoginFormProps } from "./types";

const ContainerView: React.FC<LoginFormProps> = (props) => {
    const t = useTranslations("button");
    return (
        <div className={styles.formWrapper}>
            <TMFrame childeren={
                <>
                    <div className="flex justify-between items-center gap-1">
                        <TMLanguageSelect className="bg-white dark:bg-blue dark:text-gray dark:border-none dark:shadow-lg dark:shadow-gray" />
                        <ThemeToggle />
                    </div>
                    <h1 className="text-start text-6xl font-bold text-white dark:text-gray hidden md:block">Take your productivity to the next level.</h1>
                    <div className="flex justify-between items-center gap-1">  
                        <a className="text-infoBlue" href="https://github.com/Egorkolev/semicolon-task-management" target="_blank">
                            <YellowButton type="button"><FaGithub className="mr-2" /> GitHub code review</YellowButton>
                        </a>
                        <Link href="/registration">
                            <SecondaryButton className="text-infoBlue dark:shadow-lg dark:shadow-gray" type="button" label={t("createAccount")} />
                        </Link>
                    </div>
                </>
            } />
            <div className={styles.outsideForm}>
                <LoginForm {...props} />
            </div>
        </div>
    );
};

export default ContainerView;