import React, { useEffect, useState } from "react";
import { BadgeButton, SecondaryButton } from "./TMButton";
import { FaCaretRight } from "react-icons/fa6";
import { Priority, Status } from '@/constants';
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { useDateContext } from "@/context/DateContext";
import useUserInfo from "@/hooks/useUserInfo";
import { Link } from "../../../i18n/routing";
import { useTranslations } from "next-intl";

const TMTaskCard = ({tasks, filters}: any) => {
    const t = useTranslations();
    const [fileredTask, setFileredTask] = useState<TaskType[]>()
    const {dateISO} = useDateContext();
    const user = useUserInfo();
     
    useEffect(() => {
        if(dateISO && filters) {
            if(filters !== Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => task?.startDate?.includes(dateISO) && task?.status === filters);
                setFileredTask(filtered);
            } else if(filters === Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => task?.startDate?.includes(dateISO));
                setFileredTask(filtered);
            } else {
                setFileredTask(tasks);
            }
        } else if(dateISO) {
            const filtered = tasks?.filter((task: TaskType) => task?.startDate?.includes(dateISO));
            setFileredTask(filtered);
        } else if(filters) {
            if(filters !== Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => task?.status === filters);
                setFileredTask(filtered);
            } else {
                setFileredTask(tasks);
            }
        } else {
            setFileredTask(tasks);
        }
    }, [dateISO, tasks, filters])

    const getStatusName = (status: TaskType["status"]) => {
        const statusName: any = {
            [Status.PENDING]: t("optionBadge.pending"),
            [Status.IN_PROGRESS]: t("optionBadge.inProgress"),
            [Status.COMPLETE]: t("optionBadge.complete")
        }
        return statusName[status] || t("optionBadge.pending");
    };

    const getPriorityName = (priority: TaskType["priority"]) => {
        const priorityName: any = {
            [Priority.LOW]: t("optionBadge.low"),
            [Priority.MIDDLE]: t("optionBadge.middle"),
            [Priority.HIGH]: t("optionBadge.high")
        }
        return priorityName[priority] || t("optionBadge.low");
    };

    const badgeStatus = (status: TaskType["status"]) => {
        const statusStyle: any = {
            [Status.PENDING]: "text-warningYellow bg-warningYellow bg-opacity-10",
            [Status.IN_PROGRESS]: "text-infoBlue bg-infoBlue bg-opacity-10",
            [Status.COMPLETE]: "text-successGreen bg-successGreen bg-opacity-10"
        }
        return statusStyle[status] || "text-darkBlue bg-darkBlue bg-opacity-10";
    };

    const badgePriorityIcon = (priority: TaskType["priority"]) => {
        const priorityIcon: any = {
            [Priority.LOW]: <FcLowPriority className="w-4 h-4" />,
            [Priority.MIDDLE]: <FcMediumPriority className="w-4 h-4" />,
            [Priority.HIGH]: <FcHighPriority className="w-4 h-4" />
        }
        return priorityIcon[priority] || <FcLowPriority className="w-4 h-4" />;
    }

    const badgePriorityStyle = (priority: TaskType["priority"]) => {
        const priorityStyle: any = {
            [Priority.LOW]: "text-successGreen bg-successGreen bg-opacity-10",
            [Priority.MIDDLE]: "text-warningYellow bg-warningYellow bg-opacity-10",
            [Priority.HIGH]: "text-errorRed dark:text-red-400 bg-errorRed bg-opacity-10"
        }
        return priorityStyle[priority];
    }
    return (
        <div className="flex justify-between flex-wrap gap-10 overflow-auto pb-10">
            {        
                fileredTask && fileredTask?.map((task: TaskType) => {
                    return (
                        <div key={task.id} className="flex-1 flex flex-col gap-6 p-6 justify-between bg-white dark:bg-slate-600 dark:shadow-blue dark:shadow-md w-[340px] rounded-md">
                            <div className="flex justify-between items-center">
                                <h2 className="text-gray">{task.title}</h2>
                                <BadgeButton className={badgeStatus(task.status)}>{getStatusName(task.status)}</BadgeButton>
                            </div>
                            <div className="text-darkBlue dark:text-gray">
                                {task.description}
                            </div>
                            <div className="flex justify-between items-center gap-2">
                            <Link className="text-infoBlue" href={`/${user?.userId}/tasks/${task.id}/task`}>
                                <SecondaryButton>{t("button.viewTask")}<FaCaretRight /></SecondaryButton>
                            </Link>
                                <BadgeButton className={`flex justify-between gap-2 px-2 ${badgePriorityStyle(task.priority)}`}>
                                    {getPriorityName(task.priority)}{badgePriorityIcon(task.priority)}
                                </BadgeButton>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default TMTaskCard;