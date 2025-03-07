import { UseFormHandleSubmit, UseFormRegister, UseFormReturn } from "react-hook-form";

export interface UserType {
    name:    string;
    email:   string;
    userImg: string;
}
export interface TaskType {
    id: string;
    title: string;
    description?: string | null;
    priority: "LOW" | "MIDDLE" | "HIGH";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETE";
    startDate: string | null;
    dueDate?: string | null;
    workspaceId: string;
}

export interface FormDataType {
    taskName: string;
    taskDescription?: string;
    taskPriority: "LOW" | "MIDDLE" | "HIGH";
    taskStatus: "PENDING" | "IN_PROGRESS" | "COMPLETE";
    taskStartDate: string | Date;
    taskEndDate?: string | null;
  }

export interface OwerviewTypes {
    handleUploadFile: () => Promise<void>;
    setSelectedValue: (value: string) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    closeTaskDialog: VoidFunction;
    openTaskDialog: VoidFunction;
    handleOnSubmitTask: (data: FormType) => Promise<void>;
    handleSubmit: UseFormHandleSubmit<FormDataType>;
    closeDialog: VoidFunction;
    openDialog: VoidFunction;
    register: UseFormRegister<FormDataType>;
    showAvatarDialog: boolean;
    showTaskDialog: boolean;
    isImageUpload: boolean;
    selectedValue: string;
    responseData: any;
    isUploading: boolean;
    showToast: boolean;
    taskData: TaskType[] | null;
    form: UseFormReturn<FormDataType>;
}