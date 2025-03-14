import React from "react";
import { PrimaryButton } from "@/customComponents/TMButton";
import TMInput from "@/customComponents/TMInput";
import { FormProvider } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import TMToast from "@/customComponents/TMToast";
import { useTranslations } from "next-intl";
import { CharactersLimits } from "@/constants";
import { LoginFormProps } from "./types";

const LoginForm = (props: LoginFormProps) => {
    const {form, responseData, showToast, showPass, handleLogInGuest, setShowPass, handleOnSubmit, register, handleSubmit} = props;
    const t = useTranslations("registrationForm");
    return (
        <FormProvider {...form}>
            <PrimaryButton onClick={handleLogInGuest} className="dark:shadow-lg dark:shadow-gray animate-glow mb-2" label={t("useGuestAccount")} />
            <TMToast response={responseData} trigger={showToast} />
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="space-y-4 md:space-y-8 flex-1 max-w-[397px]"
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
                    placeholder="some@gmail.com*"
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
                    placeholder="12345678*"
                    icon={
                        showPass ? 
                        (<FaEye onClick={() => setShowPass(false)} />) : 
                        (<FaEyeSlash onClick={() => setShowPass(true)} />)
                    }
                />
                <div className="flex justify-between flex-wrap gap-2">
                    <PrimaryButton type="submit" label={t("logIn")} />
                </div>
            </form>
        </FormProvider>
    )
}

export default LoginForm;