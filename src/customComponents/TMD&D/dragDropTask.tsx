import {FcHighPriority, FcLowPriority, FcMediumPriority} from "react-icons/fc";
import {BadgeButton, SecondaryButton} from "@/customComponents/TMButton";
import {TaskType} from "@/app/[locale]/[userId]/tasks/[id]/task/types";
import SpotlightCard from '@/lib/styles/SpotlightCard/SpotlightCard';
import StarBorder from "@/lib/styles/StarBorder/StarBorder";
import { useSortable } from "@dnd-kit/sortable";
import useUserInfo from "@/hooks/useUserInfo";
import {Priority, Status} from "@/constants";
import {FaCaretRight} from "react-icons/fa6";
import {useTranslations} from "next-intl";
import { CSS } from "@dnd-kit/utilities";
import {Link} from "@/i18n/routing";
import React from "react";

export default function DragDropTask({ task }: { task: TaskType }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: transform ? 1000 : 'auto',
        position: transform ? 'relative' : 'static'
    };

    const t = useTranslations();
    const user = useUserInfo();

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
        <div className="w-fit" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(0, 229, 255, 0.2)">
                <div
                    className="flex flex-col gap-6 p-6 justify-between bg-white dark:bg-neutral-900 w-[340px]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-gray">{task.title}</h2>
                        <BadgeButton className={badgeStatus(task.status)}>{getStatusName(task.status)}</BadgeButton>
                    </div>
                    <div className="text-darkBlue dark:text-gray">
                        {task.description}
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <Link className="text-infoBlue" href={`/${user?.userId}/tasks/${task.id}/task`}>
                            <StarBorder
                                as="button"
                                className="custom-class"
                                color="cyan"
                                speed="3s"
                            >
                                <SecondaryButton>{t("button.viewTask")}<FaCaretRight/></SecondaryButton>
                            </StarBorder>
                        </Link>
                        <BadgeButton className={`flex justify-between gap-2 px-2 ${badgePriorityStyle(task.priority)}`}>
                            {getPriorityName(task.priority)}{badgePriorityIcon(task.priority)}
                        </BadgeButton>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
}