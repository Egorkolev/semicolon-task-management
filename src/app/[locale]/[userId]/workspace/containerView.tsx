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
import SpotlightCard from "@/lib/styles/SpotlightCard/SpotlightCard";

const ContainerView: React.FC<WorkspaceFormProps> = (props) => {
    const {handleLogOut} = props;
    const t = useTranslations();
    return (
        <div className={styles.formWrapper}>
            <div className={styles.outsideForm}>
                <SpotlightCard className="custom-spotlight-card p-5" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <WorkspaceForm {...props} />
                </SpotlightCard>
            </div>
            <TMFrame childeren={
                <>  
                    <div className="flex justify-between items-center gap-1">
                        <ThemeToggle />
                        <TMLanguageSelect />
                    </div>
                    <h1 className="text-start text-6xl font-bold text-white hidden md:block ">{t("message.environment")}</h1>
                    <div className="flex justify-between items-center gap-1">
                        <SecondaryButton onClick={handleLogOut} label={t("button.logOut")} />
                        <a className="text-infoBlue" href="https://github.com/Egorkolev/semicolon-task-management" target="_blank">
                            <PrimaryButton type="button"><FaGithub className="mr-2" />GitHub {t("button.codeReview")}</PrimaryButton>
                        </a>
                    </div>
                </>
            } />
        </div>
    );
};

export default ContainerView;