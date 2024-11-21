"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "../../../i18n/routing";
import { refreshedToken, verifiedToken } from "@/lib/apiDataFetch/tokenFetch";
import TMToast from "../customComponents/TMToast";
import { Progress } from "@/components/ui/progress"

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
    const AuthenticatedLayout = (props: any) => {
        const [loading, setLoading] = useState<boolean>(true);
        const [showToast, setShowToast] = useState<boolean>(false);
        const [responseData, setResponseData] = useState<any>();
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            const verificationToken = async () => {
                const token = localStorage.getItem("accessToken");
                const refreshToken = localStorage.getItem("refreshToken");

                if (token) {
                    const verifyToken = await verifiedToken(token);
                    setResponseData(verifyToken)
                    if (verifyToken?.verified) {
                        setLoading(false);
                    } else if (refreshToken) {
                        const newRefreshToken = await refreshedToken(refreshToken);
                        setResponseData(newRefreshToken)
                        if (newRefreshToken?.success) {
                            localStorage.setItem("accessToken", newRefreshToken.accessToken);
                            setLoading(false);
                        } else {
                            handleLogout();
                        }
                    } else {
                        handleLogout();
                    }
                } else if (refreshToken) {
                    const newRefreshToken = await refreshedToken(refreshToken);
                    setResponseData(newRefreshToken)
                    if (newRefreshToken?.success) {
                        localStorage.setItem("accessToken", newRefreshToken.accessToken);
                        setLoading(false);
                    } else {
                        handleLogout();
                    }
                } else {
                    handleLogout();
                }
            };

            const handleLogout = () => {
                setShowToast(true);
                if(!pathname.includes("login")) {
                    router.push("/login");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }
            };

            verificationToken();
        }, [router, pathname]);

        if (loading) {
            return <Progress className="bg-blue/40" value={10} />
        }

        return (
            <>
                <WrappedComponent {...props} />
                <TMToast response={responseData} trigger={showToast} />
            </>
        );
    };
    return AuthenticatedLayout; 
};

export default WithAuth;