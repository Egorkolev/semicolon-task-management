"use client";

import { BadgeButton } from "@/app/customComponents/TMButton";
import { TMOverviewHeader } from "@/app/customComponents/TMOverviewHeader";
import { Priority, Status } from "@/constants";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TMDateBadge from "@/app/customComponents/TMDateBadge";
import { Button } from "@/components/ui/button";
import { FiTrash } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { uniqTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import TMBreadcrumb from "@/app/customComponents/TMBreadcrumb";

const Layout = () => {
    const [userId, setUserId] = useState<string | string[] | undefined>(undefined);
    const [taskId, setTaskId] = useState<string | string[] | undefined>(undefined);
    const [task, setTask] = useState<TaskType | undefined>(undefined);
    const params = useParams();
    
    useEffect(() => {
        if(params.userId && params.id) {
            setUserId(params.userId);
            setTaskId(params.id);
        }

        async function getUniqTask() {
            try {
                const response = await uniqTaskFetch(params.id);
                if(response.success) {
                    setTask(response.task);
                }
            } catch (error) {
                
            }
        }
        
        getUniqTask()
    }, [params]);

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
                return 'bg-blue hover:bg-blue hover:opacity-90 rounded-lg';
            case Status.IN_PROGRESS:
                return 'bg-successGreen hover:bg-successGreen hover:opacity-90 rounded-lg';
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
    
    return (
        <div>
            <TMOverviewHeader
                pageName={<TMBreadcrumb breadCrumbHref={`/${userId}/tasks`} breadCrumbLink="Tasks" breadCrumbPage={`Task: ${task?.title}`} />}
                textFrame={<>This page is currently under development and will be available soon. <br/>Thank you for your patience!</>}
            />
            <div className="max-w-3xl flex justify-between flex-wrap gap-10 overflow-auto m-auto mt-10">
                {task && 
                <div className="flex-1 flex flex-wrap gap-6 p-6 justify-between bg-white w-[340px] rounded-xl">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-darkBlue text-lg">{task.title}</h2>
                        <div className="flex gap-2 items-center">
                            <BadgeButton className={getBadgeClass(task.status)}>{task.status}</BadgeButton>
                            <BadgeButton 
                                className={`flex justify-between gap-2 px-2 ${getPriorityClass(task.priority)}`}
                            >
                                {task.priority}{getPriorityIcon(task.priority)}
                            </BadgeButton>
                        </div>
                        <div className="text-gray max-w-[370px]">
                            {task.description}
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <Button className={`${getButtonstatus(task.status)} items-center flex gap-2`}>
                                {task.status === Status.COMPLETE && <IoCheckmarkDoneCircle className="w-8 h-8" />}
                                {getButtonText(task.status)}
                            </Button>
                            <Button className="px-2 bg-errorRed bg-opacity-10 hover:bg-errorRed hover:bg-opacity-20">
                                <FiTrash className="w-5 h-5 text-errorRed" />
                            </Button>
                            <Button className="px-2 bg-blue bg-opacity-10 hover:bg-blue hover:bg-opacity-20">
                                <FiEdit className="w-5 h-5 text-blue" />
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-4 flex flex-col justify-between">
                        <TMDateBadge className="bg-white" label="Date Created" date={task.startDate?.slice(0, 10)} />
                            <div className="relative">
                                <div className="absolute w-px min-h-24 right-[3px] -top-[68px] bg-gray m-5"></div>
                            </div>
                        <TMDateBadge className="bg-infoBlue" label="Due Date" date={task.dueDate?.slice(0, 10)} />
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Layout;