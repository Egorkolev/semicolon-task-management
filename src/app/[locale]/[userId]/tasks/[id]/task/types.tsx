import { UseFormHandleSubmit, UseFormRegister, UseFormReturn } from "react-hook-form";

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
    taskId: string;
    taskName: string;
    taskDescription?: string | null;
    taskPriority: "LOW" | "MIDDLE" | "HIGH";
    taskStatus: "PENDING" | "IN_PROGRESS" | "COMPLETE";
    taskStartDate: string | Date;
    taskEndDate?: string | null;
    workspaceId: string;
  }

export interface TaskTypes {
    handleOnSubmitTask: (data: FormType) => Promise<void>;
    handleChangeStatus: any;
    closeDeleteDialog: VoidFunction;
    openDeleteDialog: VoidFunction;
    closeTaskDialog: VoidFunction;
    openTaskDialog: VoidFunction;
    handleDeleteTask: () => Promise<void>;
    handleSubmit: UseFormHandleSubmit<FormDataType>;
    register: UseFormRegister<FormDataType>;
    showTaskDialog: boolean;
    responseData: any;
    showToast: boolean;
    form: UseFormReturn<FormDataType>;
    getPriorityClass: (priority: TaskType["priority"]) => string;
    getPriorityIcon: (priority: TaskType["priority"]) => React.ReactNode;
    getButtonStatus: (status: TaskType["status"]) => string;
    getPriorityName: (priority: TaskType["priority"]) => string;
    getStatusName: (status: TaskType["status"]) => string;
    getBadgeClass: (status: TaskType["status"]) => string;
    getButtonText: (status: TaskType["status"]) => string;
    showDeleteDialog: boolean;
    userId: string | string[] | undefined;
    task: TaskType | undefined;
}