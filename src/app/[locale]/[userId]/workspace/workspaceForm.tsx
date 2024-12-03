"use client";
import React from "react";
import { PrimaryButton } from "../../customComponents/TMButton";
import TMInput from "../../customComponents/TMInput";
import { FormProvider } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TMTextArea from "@/app/[locale]/customComponents/TMTextArea";
import TMToast from "@/app/[locale]/customComponents/TMToast";
import useWorkspace from "./useWorkspace";
import { useTranslations } from "next-intl";
import { CharactersLimits } from "@/constants";

const WorkspaceForm = () => {
    const t = useTranslations("workspaceForm");
    const {form, showToast, responseData, register, handleSubmit, handleOnSubmit} = useWorkspace();
    return (
        <FormProvider {...form}>
        <TMToast response={responseData} trigger={showToast} />
        <Form {...form}>
            <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="space-y-8 flex-1 max-w-[397px]"
            >
                <TMInput 
                        {...register("workspaceName", {
                            required: t("workspaceRequired"),
                            minLength: {
                                value: CharactersLimits.InputMin,
                                message: t("workspaceCharactersMin", {WorkspaceMin: CharactersLimits.InputMin})
                            },
                            maxLength: {
                                value: CharactersLimits.InputMax,
                                message: t("workspaceCharactersMax", {WorkspaceMax: CharactersLimits.InputMax})
                            }
                        })} 
                    name="workspaceName" 
                    type="text"  
                    label={t("workspaceLabel")} 
                    description={t("workspaceDescription")}
                />
                <TMTextArea
                    {...register("workspaceDescription", {
                        maxLength: {
                            value: 200,
                            message: t("workspaceDescriptionCharactersMax", {workspaceDescriptionMax: CharactersLimits.TextAreaMax})
                        }
                    })}
                    name="workspaceDescription"
                    label={t("workspaceDescriptionLabel")}
                    description={t("describeWorkspace")}
                />
                <PrimaryButton className="dark:shadow-lg dark:shadow-gray" type="submit" label={t("create")} />
            </form>
        </Form>
    </FormProvider>
    )
}

export default WorkspaceForm;