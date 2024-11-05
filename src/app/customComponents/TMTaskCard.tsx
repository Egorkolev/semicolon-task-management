import React, { useEffect, useState } from "react";
import { BadgeButton, SecondaryButton } from "./TMButton";
import { FaCaretRight } from "react-icons/fa6";
import { Status } from "../../constants";
import { Priority } from "../../constants";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { useDateContext } from "@/context/DateContext";

const TMTaskCard = ({tasks, filters}: any) => {
    const [fileredTask, setFileredTask] = useState<TaskType[]>()
    const {dateISO} = useDateContext();

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
    return (
        <div className="flex justify-between flex-wrap gap-10 overflow-auto">
            {        
                fileredTask && fileredTask?.map((task: TaskType) => {
                    let badgeStatus;
                    let badgePriorityIcon;
                    let badgePriorityStyle;

                    switch(task.status) {
                        case Status.PENDING:
                            badgeStatus = "text-warningYellow bg-warningYellow bg-opacity-10";
                            break;
                        case Status.IN_PROGRESS:
                            badgeStatus = "text-infoBlue bg-infoBlue bg-opacity-10";
                            break;
                        case Status.COMPLETE: 
                            badgeStatus = "text-successGreen bg-successGreen bg-opacity-10";
                            break;
                        default: 
                            badgeStatus = "text-darkBlue bg-darkBlue bg-opacity-10";
                    }
                    switch(task.priority) {
                        case Priority.LOW:
                            badgePriorityIcon = <FcLowPriority className="w-4 h-4" />;
                            badgePriorityStyle="text-successGreen bg-successGreen bg-opacity-10";
                            break;
                        case Priority.MIDDLE:
                            badgePriorityIcon = <FcMediumPriority className="w-4 h-4" />;
                            badgePriorityStyle="text-warningYellow bg-warningYellow bg-opacity-10";
                            break;
                        case Priority.HIGH: 
                            badgePriorityIcon = <FcHighPriority className="w-4 h-4" />;
                            badgePriorityStyle="text-errorRed bg-errorRed bg-opacity-10";
                            break;
                        default: 
                            badgePriorityIcon = <FcLowPriority className="w-4 h-4" />;
                    }
                    return (
                        <div key={task.id} className="flex-1 flex flex-col gap-6 p-6 justify-between bg-white w-[340px] rounded-xl">
                            <div className="flex justify-between items-center">
                                <h2 className="text-gray">{task.title}</h2>
                                <BadgeButton className={badgeStatus}>{task.status}</BadgeButton>
                            </div>
                            <div className="text-darkBlue">
                                {task.description}
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <SecondaryButton>View Task <FaCaretRight /></SecondaryButton>
                                <BadgeButton className={`flex justify-between gap-2 px-2 ${badgePriorityStyle}`}>{task.priority}{badgePriorityIcon}</BadgeButton>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default TMTaskCard;