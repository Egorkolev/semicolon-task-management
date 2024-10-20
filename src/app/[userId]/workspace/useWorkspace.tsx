import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createWorksapceFetch } from "@/lib/apiDataFetch/workspaceFetch";


interface FormType {
    workspaceName: string,
    workspaceDescription: string;
}

const useWorkspace = () => {
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
    return {
        form,
        showToast,
        responseData,
        register,
        handleSubmit,
        handleOnSubmit,
    }
}

export default useWorkspace;