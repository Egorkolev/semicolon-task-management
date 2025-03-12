"use client";

import { TMOverviewHeader } from "@/customComponents/TMOverviewHeader";
import { PrimaryButton } from "@/customComponents/TMButton";
import StarBorder from "@/lib/styles/StarBorder/StarBorder";
import { useUserContext } from "@/context/UserContext";
import TMSwitch from "@/customComponents/TMSwitch";
import { useTheme } from "@/context/ThemeContext";
import { styles } from "@/styles/tailwindClasses";
import { FaUnlockAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const ContainerView = () => {
    const t = useTranslations();
    const {userData} = useUserContext();
    const {theme, toggleTheme} = useTheme();
    
    return (
        <div className="flex flex-col gap-10">
            <TMOverviewHeader
                pageName={t("nav.settings")}
                textFrame={<>This page is currently under development and will be available soon. <br/>Thank you for your patience!</>}
            />
            <h2 className="text-darkBlue dark:text-gray text-lg">{t("message.accountSettings")}</h2>
            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900">
                <div className="flex flex-col gap-4">
                    <div className={styles.settingsGroupItem}>
                        <FaUserAlt className="text-blue dark:text-gray dark:bg-slate-800 bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                        <div>
                            <h5 className="text-gray text-sm">{t("registrationForm.userName")}</h5>
                            <h3 className="text-darkBlue dark:text-gray text-lg">{userData?.name}</h3>
                        </div>

                    </div>
                    <div className={styles.settingsGroupItem}>
                        <MdEmail className="text-blue dark:text-gray dark:bg-slate-800 bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                        <div>
                            <h5 className="text-gray text-sm">{t("registrationForm.emailAddress")}</h5>
                            <h3 className="text-darkBlue dark:text-gray text-lg">{userData?.email}</h3>
                        </div>
                    </div>
                    <div className={styles.settingsGroupItem}>
                        <FaUnlockAlt className="text-blue dark:text-gray dark:bg-slate-800 bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                        <div>
                            <h5 className="text-gray text-sm">{t("registrationForm.password")}</h5>
                            <h3 className="text-darkBlue dark:text-gray text-lg" typeof="password">********</h3>
                        </div>
                    </div>
                    <StarBorder
                        as="button"
                        className="custom-class ml-auto"
                        color="cyan"
                        speed="6s"
                    >
                        <PrimaryButton>{t("button.edit")}</PrimaryButton>
                    </StarBorder>
                </div>
            </div>
            <h2 className="text-darkBlue dark:text-gray text-lg">{t("message.notificationSettings")}</h2>
            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900">
                <div className="flex flex-col gap-4">
                    <div className={`${styles.settingsGroupItem} justify-between`}>
                        <h5 className="text-darkBlue dark:text-gray text-sm">{t("message.allowNotifications")}</h5>
                        <TMSwitch 
                            disabled
                        />
                    </div>
                    <div className={`${styles.settingsGroupItem} justify-between`}>
                        <h5 className="text-darkBlue dark:text-gray text-sm">{t("message.sendEmails")}</h5>
                        <TMSwitch
                            disabled
                        />
                    </div>
                </div>
            </div>
            <h2 className="text-darkBlue dark:text-gray text-lg">{t("message.accessibilitySettings")}</h2>
            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900">
                <div className="flex flex-col gap-4">
                    <div className={`${styles.settingsGroupItem} justify-between`}>
                        <h5 className="text-darkBlue dark:text-gray text-sm">{t("message.darkMode")}</h5>
                        <TMSwitch 
                            onClick={toggleTheme}
                            checked={theme === "dark" ? true : false}
                        />
                    </div>
                    <div>
                        <h5 className="text-gray text-sm">{t("message.theme")}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerView;