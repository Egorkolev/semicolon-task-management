import { useEffect, useState } from "react";
import { createNewTaskFetch, userTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import { useForm } from "react-hook-form";
import { Status } from "../../../../constants";
import { Priority } from "../../../../constants";
import { useTranslations } from "next-intl";

const useTasks = () => {
    const t = useTranslations("option")
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const [taskData, setTaskData] = useState<TaskType[]>();
    const [showTaskDialog, setShowTaskDialog] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>(Status.ALL)
  
    const openTaskDialog = () => setShowTaskDialog(true);
    const closeTaskDialog = () => setShowTaskDialog(false);

    const filters = [
        {name: t("allTasks"), status: Status.ALL},
        {name: t("pending"), status: Status.PENDING},
        {name: t("inProgress"), status: Status.IN_PROGRESS},
        {name: t("completed"), status: Status.COMPLETE},
    ]

    useEffect(() => {
        async function getUserTasks() {
            try {
                const taskData = await userTaskFetch();
                setTaskData(taskData.tasks);
            } catch (error) {
                console.error("An error occurred. Please try again later", error)
            }
        }
        getUserTasks();
    }, []);

    const form = useForm({
        defaultValues: {
            taskName: "",
            taskDescription: "",
            taskPriority: Priority.MIDDLE,
            taskStatus: Status.PENDING,
            taskStartDate: new Date(),
            taskEndDate: null,
        }
    });

    const { reset, register, handleSubmit } = form;

    const handleOnSubmitTask = async(data: FormType) => {
        const response = await createNewTaskFetch(data);
        if(response.success) {
            const newTask: TaskType = {
                id: response.taskId,
                title: data.taskName,
                description: data.taskDescription || null,
                priority: (data.taskPriority as Priority.LOW | Priority.MIDDLE | Priority.HIGH) || Priority.LOW,
                status: (data.taskStatus as Status.PENDING | Status.IN_PROGRESS | Status.COMPLETE) || Status.PENDING,
                startDate: data.taskStartDate ? new Date(data.taskStartDate).toISOString() : null,
                dueDate: data.taskEndDate ? new Date(data.taskEndDate).toISOString() : null,
                workspaceId: response.workspaceId
            };
    
            setTaskData((prevData) => [
                ...(prevData || []),
                newTask
            ]);
        }
        setResponseData(response);
        setShowToast(true);
        closeTaskDialog();
        reset();
    };

    return {
        handleOnSubmitTask,
        setSelectedStatus,
        closeTaskDialog,
        openTaskDialog,
        handleSubmit,
        register,
        showTaskDialog,
        selectedStatus,
        responseData,
        showToast,
        taskData,
        filters,
        form,
    }
}

export default useTasks;