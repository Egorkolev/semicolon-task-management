"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { refreshedToken, verifiedToken } from "@/lib/apiDataFetch/tokenFetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userWorkspaceFetch } from "@/lib/apiDataFetch/workspaceFetch";
import TMToast from "../customComponents/TMToast";

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
    const AuthenticatedLayout = (props: any) => {
        const [showToast, setShowToast] = useState<boolean>(false);
        const [responseData, setResponseData] = useState<any>()
        const router = useRouter();

        useEffect(() => {
            const verificationToken = async () => {
                const token = localStorage.getItem("accessToken");
                const refreshToken = localStorage.getItem("refreshToken");
                if (!token) {      
                    if (refreshToken) {
                        const newRefreshToken = await refreshedToken(refreshToken);
                        if (newRefreshToken.accessToken) {
                            localStorage.setItem("accessToken", newRefreshToken.accessToken);
                            console.log("New access token acquured");
                        } else {
                            setResponseData(newRefreshToken);
                            setShowToast(true);
                            return;
                        }
                    } else {
                        router.push("/login");
                        return;
                    }
                } else {
                    const verifyToken = await verifiedToken(token);
                    
                    if (!verifyToken?.verified) {
                        console.error("Token verification failed");
                        localStorage.removeItem("accessToken");
                        router.push("/login");
                        setResponseData(verifyToken);
                        setShowToast(true);
                        return;
                    }
            
                    const decodedToken = jwt.decode(token);
                    const userId = (decodedToken as JwtPayload)?.userId;
                    const hasWorkspace = await userWorkspaceFetch();
                    if(!hasWorkspace?.success) {
                        router.push(`/${userId}/workspace`);
                        setResponseData(hasWorkspace);
                        setShowToast((v) => !v);
                    }
                }
            };
      
            verificationToken();
        }, [router]);

        return (
            <>
                <WrappedComponent {...props} />
                <TMToast response={responseData} trigger={showToast} />
            </>
        );
    }  
    return AuthenticatedLayout; 
};

export default WithAuth;