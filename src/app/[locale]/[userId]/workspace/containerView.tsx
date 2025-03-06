import { PrimaryButton, SecondaryButton } from "@/customComponents/TMButton";
import TMLanguageSelect from "@/customComponents/TMLanguageSelect";
import ThemeToggle from "@/customComponents/ThemeToggle";
import { TMFrame } from "@/customComponents/TMFrame";
import { styles} from "@/styles/tailwindClasses";
import { WorkspaceFormProps } from "./types";
import WorkspaceForm from "./workspaceForm";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";
import React from "react";

const ContainerView: React.FC<WorkspaceFormProps> = (props) => {
    const {handleLogOut} = props;
    const t = useTranslations();
    return (
        <div className={styles.formWrapper}>
            <div className={styles.outsideForm}>
                <WorkspaceForm {...props} />
            </div>
            <TMFrame childeren={
                <>  
                    <div className="flex justify-between items-center gap-1">
                        <ThemeToggle />
                        <TMLanguageSelect />
                    </div>
                    <h1 className="text-start text-6xl font-bold text-white dark:text-gray hidden md:block ">Your Enviroment your Will.</h1>
                    <div className="flex justify-between items-center gap-1">
                        <SecondaryButton onClick={handleLogOut} label={t("button.logOut")} />
                        <a className="text-infoBlue" href="https://github.com/Egorkolev/semicolon-task-management" target="_blank">
                            <PrimaryButton type="button"><FaGithub className="mr-2" /> GitHub code review</PrimaryButton>
                        </a>
                    </div>
                </>
            } />
        </div>
    );
};

export default ContainerView;