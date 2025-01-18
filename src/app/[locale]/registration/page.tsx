"use client";
import { Progress } from '@/components/ui/progress';
import dynamic from 'next/dynamic';
import { Suspense, useCallback } from 'react';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "../../../i18n/routing";
import { userRegisterFetch } from "@/lib/apiDataFetch/userFetch";
import { track } from '@vercel/analytics';
import { FormType } from './types';

const ContainerView = dynamic(() => import('./containerView'));
const Registration = () => {
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>()
    const router = useRouter();

    const form = useForm<FormType>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        }
    });

    const {reset, register, handleSubmit } = form;

    const handleOnSubmit = useCallback(async(data: FormType)  => {
        track("Register");
        const response = await userRegisterFetch(data);
        setResponseData(response);
        setShowToast(true);
        
        if(response?.success) {
            localStorage.setItem("userSuccess", JSON.stringify({email: data.email, password: data.password}));
            router.push('/login');
        }
        reset();
    }, []);
    return (
        <Suspense fallback={<Progress className="bg-blue/40" value={10} />}>
            <ContainerView
                {
                    ...{
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
            />  
        </Suspense>
    )
}

export default Registration;
