import { uniqTaskFetch } from "@/lib/apiDataFetch/taskFetch";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Priority, Status } from "@/constants";

const useTask = () => {
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
    return {
        getPriorityClass,
        getPriorityIcon,
        getButtonstatus,
        getBadgeClass,
        getButtonText,
        Status,
        userId,
        task,
    }
}

export default useTask;