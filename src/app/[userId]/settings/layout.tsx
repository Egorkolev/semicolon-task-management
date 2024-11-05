"use client";

import { TMOverviewHeader } from "@/app/customComponents/TMOverviewHeader";

const Layout = () => {
    return (
        <div>
            <TMOverviewHeader
                pageName="Settings"
                welcomeText="Account Settings"
                textFrame={<>This page is currently under development and will be available soon. <br/>Thank you for your patience!</>}
            />
        </div>
    );
};

export default Layout;