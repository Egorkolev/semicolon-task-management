"use client";

import { TMOverviewHeader } from "@/app/[locale]/customComponents/TMOverviewHeader";
import { useTranslations } from "next-intl";

const Layout = () => {
    const t = useTranslations();
    return (
        <div>
            <TMOverviewHeader
                pageName={t("nav.settings")}
                welcomeText={t("message.accountSettings")}
                textFrame={<>This page is currently under development and will be available soon. <br/>Thank you for your patience!</>}
            />
        </div>
    );
};

export default Layout;