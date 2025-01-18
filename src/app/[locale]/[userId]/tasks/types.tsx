import { Status } from "@/constants";
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
    taskName: string;
    taskDescription?: string;
    taskPriority: "LOW" | "MIDDLE" | "HIGH";
    taskStatus: "PENDING" | "IN_PROGRESS" | "COMPLETE";
    taskStartDate: string | Date;
    taskEndDate?: string | null;
  }

export interface FilterStatus {
    name: string;
    status: Status;
}

export interface TaskTypes {
    handleOnSubmitTask: (data: FormType) => Promise<void>;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
    closeTaskDialog: VoidFunction;
    openTaskDialog: VoidFunction;
    getStatusColor: (status: Status) => string;
    handleSubmit: UseFormHandleSubmit<FormDataType>;
    setTaskView: React.Dispatch<React.SetStateAction<boolean>>;
    register: UseFormRegister<FormDataType>;
    handleViewTaskTable: VoidFunction;
    handleViewTaskCard: VoidFunction;
    showTaskDialog: boolean;
    selectedStatus: string;
    responseData: any;
    showToast: boolean;
    taskData: TaskType[] | null;
    taskView: boolean;
    filters: FilterStatus[];
    form: UseFormReturn<FormDataType>;
}