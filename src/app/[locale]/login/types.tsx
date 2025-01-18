import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormReturn } from "react-hook-form";

export interface FormType {
    email: string;
    password: string;
}
export interface LoginFormProps {
    form: UseFormReturn<FormType>;
    responseData: any;
    showToast: boolean;
    showPass: boolean;
    handleSubmit: UseFormHandleSubmit<FormType>;
    handleLogInGuest: () => void;
    setShowPass: (show: boolean) => void;
    handleOnSubmit: SubmitHandler<FormType>;
    register: UseFormRegister<FormType>;
}