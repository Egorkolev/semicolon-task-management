"use client";
import React, {  useState } from "react";
import { PrimaryButton } from "../../customComponents/TMButton";
import TMInput from "../../customComponents/TMInput";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { createWorksapceFetch } from "@/lib/apiDataFetch/workspaceFetch";
import TMTextArea from "@/app/customComponents/TMTextArea";
import TMToast from "@/app/customComponents/TMToast";

interface FormType {
    workspaceName: string,
    workspaceDescription: string;
}

const WorkspaceForm = () => {
    const router = useRouter();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>()
    
    const form = useForm({
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
                            required: "Workspace name is required",
                            minLength: {
                                value: 2,
                                message: "Workspace name must be at least 2 characters long"
                            },
                            maxLength: {
                                value: 20,
                                message: "Workspace name cannot exceed 20 characters"
                            }
                        })} 
                    name="workspaceName" 
                    type="text"  
                    label="Tite your workspace" 
                    description="Some text to fill in this space"
                />
                <TMTextArea
                    {...register("workspaceDescription", {
                        maxLength: {
                            value: 200,
                            message: "Descption cannot exceed 200 characters long"
                        }
                    })}
                    name="workspaceDescription"
                    label="Textarea" 
                    description="Descption of what your workspace is for."
                />
                <PrimaryButton type="submit" label="Create" />
            </form>
        </Form>
    </FormProvider>
    )
}

export default WorkspaceForm;