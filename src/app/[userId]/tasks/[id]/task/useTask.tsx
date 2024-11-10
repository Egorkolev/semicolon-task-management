import { uniqTaskFetch, updateTaskFetch, updateTaskStatusFetch } from "@/lib/apiDataFetch/taskFetch";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Priority, Status } from "@/constants";
import { deleteTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import { useForm } from "react-hook-form";

const useTask = () => {
    const [userId, setUserId] = useState<string | string[] | undefined>(undefined);
    const [taskChanged, setTaskChanged] = useState<boolean>(false);
    const [task, setTask] = useState<TaskType | undefined>(undefined);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const [showTaskDialog, setShowTaskDialog] = useState<boolean>(false);
    
    const openTaskDialog = () => setShowTaskDialog(true);
    const closeTaskDialog = () => setShowTaskDialog(false);
    const closeDeleteDialog = () => setShowDeleteDialog(false);
    const openDeleteDialog = () => setShowDeleteDialog(true);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        if(params.userId && params.id) {
            setUserId(params.userId);
            async function getUniqTask() {
                try {
                    const response = await uniqTaskFetch(params.id);
                    if(response.success) {
                        setTask(response.task);
                    }
                } catch (error) {
                    console.error("Error to get Task", error)
                }
            }
            getUniqTask()
        }
    }, [params, taskChanged]);

    const handleDeleteTask = async() => {
        const response = await deleteTaskFetch(task?.id)
        if(response.success) {
            router.replace('..');
        }
        setResponseData(response);
        setShowToast(true);
        closeDeleteDialog();
    } 

    const handleChangeStatus = async(data: any) => {
        const response = await updateTaskStatusFetch(data)
        if(response.success) {
            setTaskChanged((v) => !v);
        }
        setResponseData(response);
        setShowToast(true);
    }

    const form = useForm({
        defaultValues: {
            taskId: task?.id,
            taskName: task?.title,
            taskDescription: task?.description,
            taskPriority: task?.priority || Priority.MIDDLE,
            taskStatus: task?.status || Status.PENDING,
            taskStartDate: task?.startDate || new Date(),
            taskEndDate: task?.dueDate || null,
            workspaceId: task?.workspaceId,
        }
    });

    const { reset, register, handleSubmit } = form;

    useEffect(() => {
        if(task) {
            reset({
                taskId: task?.id,
                taskName: task?.title,
                taskDescription: task?.description,
                taskPriority: task?.priority || Priority.MIDDLE,
                taskStatus: task?.status || Status.PENDING,
                taskStartDate: task?.startDate || new Date(),
                taskEndDate: task?.dueDate || null,
                workspaceId: task?.workspaceId,
            })
        }
    }, [task, reset]);

    const handleOnSubmitTask = async(data: FormType) => {
        const response = await updateTaskFetch(data);
        if(response.success) {
            setTaskChanged((v) => !v);
        }
        setResponseData(response);
        setShowToast(true);
        closeTaskDialog();
        reset();
    };

    const getBadgeClass = (status: string) => {
        switch (status) {
            case Status.PENDING:
                return 'text-warningYellow bg-warningYellow bg-opacity-10';
            case Status.IN_PROGRESS:
                return 'text-infoBlue bg-infoBlue bg-opacity-10';
            case Status.COMPLETE:
                return 'text-successGreen bg-successGreen bg-opacity-10';
            default:
                return 'text-darkBlue bg-darkBlue bg-opacity-10';
        }
    };
    
    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case Priority.LOW:
                return 'text-successGreen bg-successGreen bg-opacity-10';
            case Priority.MIDDLE:
                return 'text-warningYellow bg-warningYellow bg-opacity-10';
            case Priority.HIGH:
                return 'text-errorRed bg-errorRed bg-opacity-10';
            default:
                return 'text-successGreen bg-successGreen bg-opacity-10';
        }
    };
    
    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case Priority.LOW:
                return <FcLowPriority className="w-4 h-4" />;
            case Priority.MIDDLE:
                return <FcMediumPriority className="w-4 h-4" />;
            case Priority.HIGH:
                return <FcHighPriority className="w-4 h-4" />;
            default:
                return <FcLowPriority className="w-4 h-4" />;
        }
    };

    const getButtonstatus = (status: string) => {
        switch (status) {
            case Status.PENDING:
                return 'bg-blue hover:bg-blue opacity-90 hover:opacity-100 rounded-lg';
            case Status.IN_PROGRESS:
                return 'bg-successGreen hover:bg-successGreen opacity-90 hover:opacity-100 rounded-lg';
            case Status.COMPLETE:
                return 'text-successGreen bg-white shadow-none hover:bg-white cursor-default border-none pl-0';
            default:
                return 'bg-blue rounded-lg';
        }
    };

    const getButtonText = (status: string) => {
        switch (status) {
            case Status.PENDING:
                return 'Work on it Now';
            case Status.IN_PROGRESS:
                return 'Mark As Done';
            case Status.COMPLETE:
                return 'This task has been completed';
            default:
                return 'View Task';
        }
    };
    return {
        handleOnSubmitTask,
        handleChangeStatus,
        closeDeleteDialog,
        openDeleteDialog,
        handleDeleteTask, 
        getPriorityClass,
        getPriorityIcon,
        closeTaskDialog,
        getButtonstatus,
        openTaskDialog,
        getBadgeClass,
        getButtonText,
        handleSubmit,
        register,
        showDeleteDialog,
        showTaskDialog,
        responseData, 
        showToast,
        Status,
        userId,
        task,
        form,
    }
}

export default useTask;