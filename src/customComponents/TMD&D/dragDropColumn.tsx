import React from 'react';
import DragDropTask from "@/customComponents/TMD&D/dragDropTask"; // Компонент таски
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {Status} from "@/constants";
import {useTranslations} from "next-intl";
import {BadgeButton} from "@/customComponents/TMButton";
import {useDroppable} from "@dnd-kit/core";

export default function Column({ id, tasks, title }: { id: string; tasks: any[], title: string; }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const t = useTranslations();

    const getStatusStyle = (status: string) => {
        const statusName: any = {
            [Status.PENDING]: "bg-warningYellow",
            [Status.IN_PROGRESS]: "bg-infoBlue",
            [Status.COMPLETE]: "bg-successGreen"
        }
        return statusName[status];
    };

    const getStatusStyleBorder = (status: string) => {
        const statusName: any = {
            [Status.PENDING]: "border-warningYellow",
            [Status.IN_PROGRESS]: "border-infoBlue",
            [Status.COMPLETE]: "border-successGreen"
        }
        return statusName[status];
    };

    const getStatusName = (status: string) => {
        const statusName: any = {
            [Status.PENDING]: t("optionBadge.pending"),
            [Status.IN_PROGRESS]: t("optionBadge.inProgress"),
            [Status.COMPLETE]: t("optionBadge.complete")
        }
        return statusName[status] || t("optionBadge.pending");
    };

    const badgeStatus = (status: string) => {
        const statusStyle: any = {
            [Status.PENDING]: "text-warningYellow bg-warningYellow bg-opacity-10",
            [Status.IN_PROGRESS]: "text-infoBlue bg-infoBlue bg-opacity-10",
            [Status.COMPLETE]: "text-successGreen bg-successGreen bg-opacity-10"
        }
        return statusStyle[status] || "text-darkBlue bg-darkBlue bg-opacity-10";
    };

    return (
        <div className="flex flex-col items-center">
            <BadgeButton className={`my-2 text-md ${badgeStatus(id || title)}`}>{getStatusName(id || title)}</BadgeButton>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <div ref={setNodeRef} className={`flex flex-col gap-4 px-2 py-4 rounded-md h-full min-w-[357px] min-h-[300px] border 
                    ${getStatusStyleBorder(id)} 
                    ${getStatusStyle(id)} 
                    ${isOver ? 'bg-opacity-40' : 'bg-opacity-20'}`}
                >
                    {tasks.map((task) => (
                        <DragDropTask key={task.id} task={task}/>
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}