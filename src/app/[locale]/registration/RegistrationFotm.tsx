import React from "react";
import { PrimaryButton } from "../customComponents/TMButton";
import TMInput from "../customComponents/TMInput";
import { FormProvider } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import TMToast from "../customComponents/TMToast";
import { useTranslations } from "next-intl";
import { CharactersLimits } from "@/constants";
import { RegisterFormProps } from "./types";

const RegistrationForm = (props: RegisterFormProps) => {
    const {form, showPass, showToast, responseData, setShowPass, register, handleSubmit, handleOnSubmit}  = props;
    const t = useTranslations("registrationForm");
    return (
        <FormProvider {...form}>
            <TMToast response={responseData} trigger={showToast} />
            <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="space-y-8 flex-1 max-w-[397px]"
            >
                <TMInput 
                    {...register("fullName", {
                        required: t("userNameRequired"),
                        minLength: {
                            value: CharactersLimits.UserNameMin,
                            message: t("userNameCharactersMin", {UserNameMin: CharactersLimits.UserNameMin})
                        },
                        maxLength: {
                            value: CharactersLimits.InputMax,
                            message: t("userNameCharactersMax", {UserNameMax: CharactersLimits.InputMax})
                        }
                    })} 
                    name="fullName" 
                    type="text" 
                    label={t("userName")}
                    description="Egor Kolev*"
                />
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
            <PrimaryButton className="dark:shadow-lg dark:shadow-gray" type="submit" label={t("createAccount")} />
            </form>
        </FormProvider>
    )
};

export default RegistrationForm;