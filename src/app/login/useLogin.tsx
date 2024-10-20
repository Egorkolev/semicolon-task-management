
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
    const user = useUserInfo();
    
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { reset, register, handleSubmit } = form;

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
            const isWorkspace = await userWorkspaceFetch();
            if(isWorkspace?.success) {
                router.push("/");
            } else {
                router.push(`/${user?.userId}/workspace`);
            }
        };
        reset();
    };
    return {
        form,
        showPass,
        showToast,
        responseData,
        register,
        setShowPass,
        handleSubmit,
        handleOnSubmit,
    }
}

export default useLogin;