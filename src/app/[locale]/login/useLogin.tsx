"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "../../../i18n/routing";
import { userLoginFetch } from "@/lib/apiDataFetch/userFetch";
import { userWorkspaceFetch } from "@/lib/apiDataFetch/workspaceFetch";
import useUserInfo from "@/hooks/useUserInfo";

interface FormType {
    email: string;
    password: string;
}

const useLogin = () => {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const router = useRouter();

    const form = useForm({
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

    const handleOnSubmit = async(data: FormType) => {
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
    };

    const handleLogInGuest = () => {
        handleOnSubmit({
            email: "guest@gmail.com",
            password: "12345678",
        })
    }
    return {
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

export default useLogin;