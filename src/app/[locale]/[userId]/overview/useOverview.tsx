import { useEffect, useState } from "react";
import { userAvatarFetch, userDataFetch } from "@/lib/apiDataFetch/userFetch";
import { createNewTaskFetch, userTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import { useUserContext } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { Status } from "../../../../constants";
import { Priority } from "../../../../constants";
import { useTranslations } from "next-intl";

const useOverview = () => {
    const t = useTranslations("warning");
    const {userData, setUserData} = useUserContext();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const [taskData, setTaskData] = useState<TaskType[]>();
    const [showAvatarDialog, setShowAvatarDialog] = useState<boolean>(false);
    const [showTaskDialog, setShowTaskDialog] = useState<boolean>(false);
    const [isImageUpload, setIsImageUpload] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState(!userData?.userImg ? "a" : "b");
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    
  
    const openDialog = () => setShowAvatarDialog(true);
    const closeDialog = () => setShowAvatarDialog(false);
    const openTaskDialog = () => setShowTaskDialog(true);
    const closeTaskDialog = () => setShowTaskDialog(false);

    useEffect(() => {
        if(userData?.userImg && selectedValue === "a") {
            setSelectedValue("b")
        }
    }, [userData?.userImg, selectedValue])

    useEffect(() => {
        async function getUserData() {
            try {
                const userData = await userDataFetch();
                setUserData(userData.data);
            } catch (error) {
                console.error("An error occurred. Please try again later", error)
            }
        }
        getUserData();
    }, [isImageUpload, setUserData]);

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if(selectedFile) {
            const fileSizeInMB = selectedFile.size / (1024 * 1024);
            if(fileSizeInMB > 2) {
            setResponseData({warning: t("fileSize")});
            setShowToast(true);
            return;
            }
            setFile(selectedFile);
        }
    }

    const handleUploadFile = async() => {
        if (!file) {
            console.error("No file selected for upload");
            return;
        }
        setIsUploading(true);
        try {
             const response = await userAvatarFetch(file); 
             if(response) {
                setIsImageUpload((v) => !v);
             };
            setResponseData(response);
            setShowToast(true);
            closeDialog(); 
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setIsUploading(false);
        }
    }

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
        closeTaskDialog()
        reset();
    };

    return {
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

export default useOverview;