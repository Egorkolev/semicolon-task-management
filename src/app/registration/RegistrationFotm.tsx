"use client";
import React from "react";
import { PrimaryButton } from "../customComponents/TMButton";
import TMInput from "../customComponents/TMInput";
import { FormProvider } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import TMToast from "../customComponents/TMToast";
import useRegistration from "./useRegistration";

const RegistrationForm = () => {
    const {form, showPass, showToast, responseData, setShowPass, register, handleSubmit, handleOnSubmit}  = useRegistration();
    return (
        <FormProvider {...form}>
            <TMToast response={responseData} trigger={showToast} />
            <Form {...form}>
                <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="space-y-8 flex-1 max-w-[397px]"
                >
                    <TMInput 
                        {...register("fullName", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Username must be at least 3 characters long"
                            },
                            maxLength: {
                                value: 20,
                                message: "Username cannot exceed 20 characters"
                            }
                        })} 
                        name="fullName" 
                        type="text" 
                        label="Username" 
                        description="Egor Kolev*"
                    />
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
                <PrimaryButton type="submit" label="Create Account" />
                </form>
            </Form>
        </FormProvider>
    )
};

export default RegistrationForm;