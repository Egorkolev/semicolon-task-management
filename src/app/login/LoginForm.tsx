"use client";
import React, { useState } from "react";
import { PrimaryButton } from "../customComponents/TMButton";
import TMInput from "../customComponents/TMInput";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { userLoginFetch } from "@/lib/apiDataFetch/userFetch";

const LoginForm = () => {
    const [showPass, setShowPass] = useState<boolean>(false)
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { reset, register, handleSubmit } = form;

    const handleOnSubmit = async(data: any) => {
        const response = await userLoginFetch(data);
        
        if(response?.accessToken && response?.refreshToken) {
            await Promise.all([
                localStorage.setItem('accessToken', response.accessToken),
                localStorage.setItem('refreshToken', response.refreshToken)
            ]);
        };

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if(accessToken && refreshToken) {
            router.push("/");
        };
        reset();
    };
    return (
        <FormProvider {...form}>
        <Form {...form}>
            <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="space-y-8 flex-1 max-w-[397px]"
            >
                <TMInput 
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address"
                        }
                    })}
                    name="email" 
                    type="email"  
                    label="Email Address" 
                    description="some@gmail.com*"
                />
                <TMInput 
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                        },
                        maxLength: {
                            value: 20,
                            message: "Password cannot exceed 20 characters long"
                        }
                    })}
                    name="password" 
                    type={showPass ? "text" : "password"}
                    label="Password" 
                    description="12345678*"
                    icon={
                        showPass ? 
                        (<FaEye onClick={() => setShowPass(false)} />) : 
                        (<FaEyeSlash onClick={() => setShowPass(true)} />)
                    }
                />
                <PrimaryButton type="submit" label="Log In" />
            </form>
        </Form>
    </FormProvider>
    )
}

export default LoginForm;