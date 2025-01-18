import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormReturn } from "react-hook-form";

export interface FormType {
    fullName: string,
    email: string;
    password: string;
}

export interface RegisterFormProps {
    form: UseFormReturn<FormType>;
    responseData: any;
    showToast: boolean;
    showPass: boolean;
    handleSubmit: UseFormHandleSubmit<FormType>;
    setShowPass: (show: boolean) => void;
    handleOnSubmit: SubmitHandler<FormType>;
    register: UseFormRegister<FormType>;
}