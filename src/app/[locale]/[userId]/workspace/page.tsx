"use client";
import { Progress } from '@/components/ui/progress';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";
import { createWorksapceFetch } from "@/lib/apiDataFetch/workspaceFetch";
import { FormType } from './types';

const ContainerView = dynamic(() => import('./containerView'));
const Workspace = () => {
    const router = useRouter();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>()
    
    const form = useForm<FormType>({
        defaultValues: {
            workspaceName: "",
            workspaceDescription: "",
        }
    });

    const { reset, register, handleSubmit } = form;

    const handleOnSubmit = async(data: FormType) => {
        const response = await createWorksapceFetch(data);
        setResponseData(response);
        setShowToast(true);
        if(response.success) {
            router.push("/");
        } else {
            return;
        }
        reset();
    };

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
    }
    return (
        <Suspense fallback={<Progress className="bg-blue/40" value={10} />}>
            <ContainerView
                {
                    ...{
                        form,
                        showToast,
                        responseData,
                        register,
                        handleSubmit,
                        handleOnSubmit,
                        handleLogOut,
                    }
                }
            />  
        </Suspense>
    )
}

export default Workspace;