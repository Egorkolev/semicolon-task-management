"use client";
import { Progress } from '@radix-ui/react-progress';
import dynamic from 'next/dynamic';
import { Suspense, useCallback } from 'react';
import { useEffect, useState } from "react";
import { createNewTaskFetch, userTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import { useUserContext } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { Status } from "@/constants";
import { Priority } from "@/constants";
import { useTranslations } from "next-intl";
import { useTaskContext } from "@/context/TaskContext";
import { FormDataType, TaskType } from './types';
import { useFileContext } from '@/context/FileUploadContext';

const ContainerView = dynamic(() => import('./containerView'));
const Overview = () => {
    const t = useTranslations("warning");
    const {handleUploadFile, handleFileChange, closeDialog, openDialog, showAvatarDialog, isUploading, isImageUpload} = useFileContext();
    const [showToast, setShowToast] = useState<boolean>(false);
    const {userData} = useUserContext();
    const [responseData, setResponseData] = useState<any>();
    const {taskData, setTaskData} = useTaskContext();
    const [showTaskDialog, setShowTaskDialog] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState(!userData?.userImg ? "a" : "b");
    
    const openTaskDialog = () => setShowTaskDialog(true);
    const closeTaskDialog = () => setShowTaskDialog(false);

    useEffect(() => {
        if(userData?.userImg && selectedValue === "a") {
            setSelectedValue("b")
        }
    }, [userData?.userImg, selectedValue])

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

    const handleOnSubmitTask = useCallback(async(data: FormType) => {
        const response = await createNewTaskFetch(data);
        if(response.success) {
            const newTask: TaskType = {
                id: response.userId,
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
                        handleUploadFile,
                        setSelectedValue,
                        handleFileChange,
                        closeTaskDialog,
                        openTaskDialog,
                        handleOnSubmitTask,
                        handleSubmit,
                        closeDialog,
                        openDialog,
                        register,
                        showAvatarDialog,
                        showTaskDialog,
                        isImageUpload,
                        selectedValue,
                        responseData,
                        isUploading,
                        showToast,
                        taskData,
                        form,
                    }
                }
            />  
        </Suspense>

    )
}

export default Overview;