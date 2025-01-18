"use client";
import { Progress } from "@/components/ui/progress";
import dynamic from "next/dynamic";
import { Suspense, useCallback } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "../../../i18n/routing";
import { userLoginFetch } from "@/lib/apiDataFetch/userFetch";
import { userWorkspaceFetch } from "@/lib/apiDataFetch/workspaceFetch";
import { track } from '@vercel/analytics';
import { FormType } from "./types";

const ContainerView = dynamic(() => import('./containerView'));
const Login = () => {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const router = useRouter();

    const form = useForm<FormType>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { reset, register, handleSubmit } = form;

    useEffect(() => {
        if(typeof window !== undefined) {
            const storedUser = localStorage.getItem("userSuccess"); 
            if(storedUser) {
                form.reset(JSON.parse(storedUser))
            }
        }
    }, [form])

    const handleOnSubmit = useCallback(async(data: FormType)  => {
        track('LogIn');
        const response = await userLoginFetch(data);
        setResponseData(response);
        setShowToast(true);
        
        if(response?.accessToken && response?.refreshToken) {
            await Promise.all([
                localStorage.setItem('accessToken', response.accessToken),
                localStorage.setItem('refreshToken', response.refreshToken)
            ]);
        };
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if(accessToken && refreshToken) {
            localStorage.removeItem("userSuccess");
            const isWorkspace = await userWorkspaceFetch();
            if(isWorkspace?.success) {
                router.push("/");
            } else {
                router.push(`/${response?.userId}/workspace`);
            }
        };
        reset();
    }, []);

    const handleLogInGuest = useCallback(() => {
        track('Guest Account');
        handleOnSubmit({
            email: "guest@gmail.com",
            password: "12345678",
        })
    }, []);
    return (
        <>
            <Suspense fallback={<Progress className="bg-blue/40" value={10} />}>
                <ContainerView
                    {
                        ...{
                            handleLogInGuest,
                            handleOnSubmit,
                            handleSubmit,
                            setShowPass,
                            register,
                            responseData,
                            showToast,
                            showPass,
                            form,
                        }
                    }
                />  
            </Suspense>
        </>

    )
}

export default Login;