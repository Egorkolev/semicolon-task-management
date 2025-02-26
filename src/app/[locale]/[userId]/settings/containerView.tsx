"use client";

import { TMOverviewHeader } from "@/customComponents/TMOverviewHeader";
import { useTranslations } from "next-intl";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { styles } from "@/styles/tailwindClasses";
import { useUserContext } from "@/context/UserContext";
import { FaUnlockAlt } from "react-icons/fa";
import { PrimaryButton } from "@/customComponents/TMButton";
import TMSwitch from "@/customComponents/TMSwitch";
import { useTheme } from "@/context/ThemeContext";


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
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-700">
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
                    <PrimaryButton className="w-fit ">{t("button.edit")}</PrimaryButton>
                </div>
            </div>
            <h2 className="text-darkBlue dark:text-gray text-lg">{t("message.notificationSettings")}</h2>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-700">
                <div className="flex flex-col gap-4">
                    <div className={`${styles.settingsGroupItem} justify-between`}>
                        <h5 className="text-darkBlue dark:text-gray text-sm">Allow Desktop Notifications</h5>
                        <TMSwitch 
                            disabled
                        />
                    </div>
                    <div className={`${styles.settingsGroupItem} justify-between`}>
                        <h5 className="text-darkBlue dark:text-gray text-sm">Send Critical Notifications to My Email</h5>
                        <TMSwitch
                            disabled
                        />
                    </div>
                </div>
            </div>
            <h2 className="text-darkBlue dark:text-gray text-lg">{t("message.accessibilitySettings")}</h2>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-700">
                <div className="flex flex-col gap-4">
                    <div className={`${styles.settingsGroupItem} justify-between`}>
                        <h5 className="text-darkBlue dark:text-gray text-sm">Enable Dark Mode</h5>
                        <TMSwitch 
                            onClick={toggleTheme}
                            checked={theme === "dark" ? true : false}
                        />
                    </div>
                    <div>
                        <h5 className="text-gray text-sm">Personalize Workspace Theme</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerView;