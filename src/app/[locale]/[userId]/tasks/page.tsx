"use client";
import { Progress } from '@/components/ui/progress';
import dynamic from 'next/dynamic';
import { Suspense, useCallback } from 'react';
import { useEffect, useState } from "react";
import { createNewTaskFetch, userTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import { useForm } from "react-hook-form";
import { Status } from "@/constants";
import { Priority } from "@/constants";
import { useTranslations } from "next-intl";
import { useTaskContext } from "@/context/TaskContext";
import { FormDataType, TaskType } from './types';

const ContainerView = dynamic(() => import('./containerView'));
const Tasks = () => {
    const t = useTranslations("option")
    const [showToast, setShowToast] = useState<boolean>(false);
    const [taskView, setTaskView] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const [showTaskDialog, setShowTaskDialog] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>(Status.ALL)
    const {taskData, setTaskData} = useTaskContext();
    const openTaskDialog = () => setShowTaskDialog(true);
    const closeTaskDialog = () => setShowTaskDialog(false);

    const filters = [
        {name: t("allTasks"), status: Status.ALL},
        {name: t("pending"), status: Status.PENDING},
        {name: t("inProgress"), status: Status.IN_PROGRESS},
        {name: t("completed"), status: Status.COMPLETE},
    ]

    const getStatusColor = (status: string) => {
        const statusColor: any = {
            [Status.ALL]: "blue",
            [Status.PENDING]: "warningYellow",
            [Status.IN_PROGRESS]: "infoBlue",
            [Status.COMPLETE]: "successGreen",
        }
        return statusColor[status] || "blue";
    };

    useEffect(() => {
        async function getUserTasks() {
            try {
                const taskData = await userTaskFetch();
                setTaskData(taskData.tasks);
            } catch (error) {
                console.error("An error occurred. Please try again later", error)
            }
        }
        const taskViewStorage = localStorage.getItem("taskView");
        setTaskView(taskViewStorage === "true" ? true : false);
        getUserTasks();
    }, []);

    const form = useForm<FormDataType>({
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

    const handleViewTaskTable = useCallback(() => {
        setTaskView(true);
        localStorage.setItem('taskView', "true");
    }, []);
    const handleViewTaskCard = useCallback(() => {
        setTaskView(false);
        localStorage.setItem('taskView', "false");
    }, []);

    const handleOnSubmitTask = useCallback(async(data: FormType) => {
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
    }, []);

    return (
        <Suspense fallback={<Progress className="bg-blue/40" value={10} />}>
            <ContainerView 
                {
                    ...{
                        handleOnSubmitTask,
                        setSelectedStatus,
                        closeTaskDialog,
                        openTaskDialog,
                        getStatusColor,
                        handleSubmit,
                        setTaskView,
                        register,
                        handleViewTaskTable,
                        handleViewTaskCard, 
                        showTaskDialog,
                        selectedStatus,
                        responseData,
                        showToast,
                        taskData,
                        taskView,
                        filters,
                        form,
                    }
                }
            />  
        </Suspense>

    )
}

export default Tasks;