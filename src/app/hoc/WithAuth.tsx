"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { refreshedToken, verifiedToken } from "@/lib/apiDataFetch/tokenFetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userWorkspaceFetch } from "@/lib/apiDataFetch/workspaceFetch";

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
    const AuthenticatedLayout = (props: any) => {
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
                        router.push("/login");
                        return;
                        }
                    } else {
                        router.push("/login");
                        return;
                    }
                } else {
                    const verifyToken = await verifiedToken(token);
                    console.log("verifyToken", verifyToken);
                    
                    if (!verifyToken?.verified) {
                        console.error("Token verification failed");
                        localStorage.removeItem("accessToken");
                        router.push("/login");
                        return;
                    }
            
                    console.log("Token is successfuly verified");
                    const decodedToken = jwt.decode(token);
                    const userId = (decodedToken as JwtPayload)?.userId;
                    const hasWorkspace = await userWorkspaceFetch();
                    console.log("hasWorkspace", hasWorkspace);
                    
                    if(!hasWorkspace.hasWorkspace) {
                        router.push(`/${userId}/workspace`);
                    } else {
                        router.push("/");
                    }
                }
            };
      
            verificationToken();
        }, [router]);

        return <WrappedComponent {...props} />;
    }  
    return AuthenticatedLayout; 
};

export default WithAuth;