"use client";
import React from "react";
import { PrimaryButton } from "../customComponents/TMButton";
import TMInput from "../customComponents/TMInput";
import { FormProvider } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import TMToast from "../customComponents/TMToast";
import useLogin from "./useLogin";
import { useTranslations } from "next-intl";
import { CharactersLimits } from "@/constants";

const LoginForm = () => {
    const t = useTranslations("registrationForm");
    const {form, responseData, showToast, showPass, handleLogInGuest, setShowPass, handleOnSubmit, register, handleSubmit} = useLogin();
    return (
        <FormProvider {...form}>
            <TMToast response={responseData} trigger={showToast} />
            <Form {...form}>
                <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="space-y-8 flex-1 max-w-[397px]"
                >
                    <TMInput 
                        {...register("email", {
                            required: t("emailRequired"),
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: t("invalidEmail")
                            }
                        })}
                        name="email" 
                        type="email"  
                        label={t("emailAddress")} 
                        description="some@gmail.com*"
                    />
                    <TMInput 
                        {...register("password", {
                            required: t("passwordRequired"),
                            minLength: {
                                value: CharactersLimits.PasswordMin,
                                message: t("passwordCharactersMin", {PasswordMin: CharactersLimits.PasswordMin})
                            },
                            maxLength: {
                                value: CharactersLimits.InputMax,
                                message: t("passwordCharactersMax", {PasswordMax: CharactersLimits.InputMax})
                            }
                        })}
                        name="password" 
                        type={showPass ? "text" : "password"}
                        label={t("password")}  
                        description="12345678*"
                        icon={
                            showPass ? 
                            (<FaEye onClick={() => setShowPass(false)} />) : 
                            (<FaEyeSlash onClick={() => setShowPass(true)} />)
                        }
                    />
                    <div className="flex justify-between flex-wrap gap-2">
                        <PrimaryButton className="dark:shadow-lg dark:shadow-gray" type="submit" label={t("logIn")} />
                        <PrimaryButton onClick={handleLogInGuest} className="dark:shadow-lg dark:shadow-gray" label={t("useGuestAccount")} />
                    </div>
                </form>
            </Form>
        </FormProvider>
    )
}

export default LoginForm;