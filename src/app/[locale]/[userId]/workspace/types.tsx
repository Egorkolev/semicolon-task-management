import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormReturn } from "react-hook-form";

export interface FormType {
    workspaceName: string,
    workspaceDescription: string;
}

export interface WorkspaceFormProps {
        form: UseFormReturn<FormType>;
        showToast: boolean;
        responseData: any;
        handleLogOut: VoidFunction;
        handleSubmit: UseFormHandleSubmit<FormType>;
        handleOnSubmit: SubmitHandler<FormType>;
        register: UseFormRegister<FormType>;
}