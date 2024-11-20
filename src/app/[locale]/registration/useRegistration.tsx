"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "../../../i18n/routing";
import { userRegisterFetch } from "@/lib/apiDataFetch/userFetch";

interface FormType {
    fullName: string,
    email: string;
    password: string;
}

const useRegistration = () => {
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>()
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        }
    });

    const {reset, register, handleSubmit } = form;

    const handleOnSubmit = async(data: FormType) => {
        const response = await userRegisterFetch(data);
        setResponseData(response);
        setShowToast(true);
        
        if(response?.success) {
            localStorage.setItem("userSuccess", JSON.stringify({email: data.email, password: data.password}));
            router.push('/login');
        }
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

export default useRegistration;