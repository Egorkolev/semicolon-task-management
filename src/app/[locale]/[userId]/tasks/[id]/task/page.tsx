"use client";
import { Progress } from '@/components/ui/progress';
import dynamic from 'next/dynamic';
import { Suspense, useCallback } from 'react';
import { uniqTaskFetch, updateTaskFetch, updateTaskStatusFetch } from "@/lib/apiDataFetch/taskFetch";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { Priority, Status } from "@/constants";
import { deleteTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormDataType, TaskType } from './types';

const ContainerView = dynamic(() => import('./containerView'));
const Task = () => {
    const t = useTranslations();
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

    const handleDeleteTask = useCallback(async() => {
        const response = await deleteTaskFetch(task?.id)
        if(response.success) {
            router.replace('..');
        }
        setResponseData(response);
        setShowToast(true);
        closeDeleteDialog();
    }, [task]);

    const handleChangeStatus = useCallback(async(data: any) => {
        if(data.status !== Status.COMPLETE) {
            const response = await updateTaskStatusFetch(data)
            if(response.success) {
                setTaskChanged((v) => !v);
            }
            setResponseData(response);
            setShowToast(true);
        }
    }, []);

    const form = useForm<FormDataType>({
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

    const handleOnSubmitTask = useCallback(async(data: FormType) => {
        const response = await updateTaskFetch(data);
        if(response.success) {
            setTaskChanged((v) => !v);
        }
        setResponseData(response);
        setShowToast(true);
        closeTaskDialog();
        reset();
    }, []);

    const getBadgeClass = (status: string) => {
        const statusBadgeClass: any = {
            [Status.PENDING]: 'text-warningYellow bg-warningYellow bg-opacity-10',
            [Status.IN_PROGRESS]: 'text-infoBlue bg-infoBlue bg-opacity-10',
            [Status.COMPLETE]: 'text-successGreen bg-successGreen bg-opacity-10',
        }
        return statusBadgeClass[status] || 'text-darkBlue bg-darkBlue bg-opacity-10';
    };
    
    const getPriorityClass = (priority: string) => {
        const priorityClass: any = {
            [Priority.LOW]: 'text-successGreen bg-successGreen bg-opacity-10',
            [Priority.MIDDLE]: 'text-warningYellow bg-warningYellow bg-opacity-10',
            [Priority.HIGH]: 'text-errorRed dark:text-red-400 bg-errorRed bg-opacity-10',
        }
        return priorityClass[priority] || 'text-successGreen bg-successGreen bg-opacity-10';
    };
    
    const getPriorityIcon = (priority: string) => {
        const priorityIcon: any = {
            [Priority.LOW]: <FcLowPriority className="w-4 h-4" />,
            [Priority.MIDDLE]: <FcMediumPriority className="w-4 h-4" />,
            [Priority.HIGH]: <FcHighPriority className="w-4 h-4" />,
        }
        return priorityIcon[priority] || <FcLowPriority className="w-4 h-4" />;
    };

    const getButtonStatus = (status: string) => {
        const buttonStatus: any = {
            [Status.PENDING]: 'bg-blue hover:bg-blue opacity-90 hover:opacity-100 rounded-lg dark:text-gray',
            [Status.IN_PROGRESS]: 'bg-successGreen hover:bg-successGreen opacity-90 hover:opacity-100 rounded-lg dark:text-white',
            [Status.COMPLETE]: 'text-successGreen bg-white dark:bg-successGreen dark:bg-opacity-10  shadow-none hover:bg-white cursor-default border-none pl-0',
        }
        return buttonStatus[status] || 'bg-blue rounded-lg';
    };

    const getButtonText = (status: string) => {
        const buttonText: any = {
            [Status.PENDING]: t("button.workNow"),
            [Status.IN_PROGRESS]: t("button.markAsDone"),
            [Status.COMPLETE]: t("button.taskHasBeenCompleted"),
        }
        return buttonText[status] || t("button.viewTask");
    };

    const getStatusName = (status: string) => {
        const statusName: any = {
            [Status.PENDING]: t("optionBadge.pending"),
            [Status.IN_PROGRESS]: t("optionBadge.inProgress"),
            [Status.COMPLETE]: t("optionBadge.complete"),
        }
        return statusName[status] || t("optionBadge.pending");
    };

    const getPriorityName = (priority: string) => {
        const priorityName: any = {
            [Priority.LOW]: t("optionBadge.low"),
            [Priority.MIDDLE]: t("optionBadge.middle"),
            [Priority.HIGH]: t("optionBadge.high"),
        }
        return priorityName[priority] || t("optionBadge.low");
    };

    return (
        <Suspense fallback={<Progress className="bg-blue/40" value={10} />}>
            <ContainerView 
                {
                    ...{
                        handleOnSubmitTask,
                        handleChangeStatus,
                        closeDeleteDialog,
                        openDeleteDialog,
                        closeTaskDialog,
                        openTaskDialog,
                        handleDeleteTask, 
                        getPriorityClass,
                        getPriorityIcon,
                        getButtonStatus,
                        getPriorityName,
                        getStatusName,
                        getBadgeClass,
                        getButtonText,
                        handleSubmit,
                        register,
                        showDeleteDialog,
                        showTaskDialog,
                        responseData, 
                        showToast,
                        userId,
                        task,
                        form,
                    }
                }
            />  
        </Suspense>
    )
}

export default Task;