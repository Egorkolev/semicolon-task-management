import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Priority, Status } from '@/constants';
import { useTranslations } from 'next-intl';
import { useDateContext } from '@/context/DateContext';
import useUserInfo from '@/hooks/useUserInfo';
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc';
import { BadgeButton, SecondaryButton } from './TMButton';
import { Link } from '@/i18n/routing';
import { FaCaretRight } from 'react-icons/fa';

export default function TMTaskTable({tasks, filters}: any) {

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

    const getStatusName = (status: string) => {
        switch (status) {
            case Status.PENDING:
                return t("optionBadge.pending");
            case Status.IN_PROGRESS:
                return t("optionBadge.inProgress");
            case Status.COMPLETE:
                return t("optionBadge.complete");
            default:
                return t("optionBadge.pending");
        }
    };

    const getPriorityName = (priority: string) => {
        switch (priority) {
            case Priority.LOW:
                return t("optionBadge.low");
            case Priority.MIDDLE:
                return t("optionBadge.middle");
            case Priority.HIGH:
                return t("optionBadge.high");
            default:
                return t("optionBadge.low");
        }
    };

  return (
        <>
            <div>
                <Table className='bg-white dark:bg-slate-600 rounded-md dark:shadow-blue dark:shadow-md'>
                    <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow className='dark:shadow-blue dark:shadow-md'>
                                <TableHead className='font-bold'>{t("taskTable.title")}</TableHead>
                                <TableHead className='font-bold'>{t("taskTable.description")}</TableHead>
                                <TableHead className='font-bold'>{t("taskTable.priority")}</TableHead>
                                <TableHead className='font-bold'>{t("taskTable.status")}</TableHead>
                                <TableHead className="text-right font-bold">{t("taskTable.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                    <TableBody>
                    {fileredTask && fileredTask?.map((task: TaskType) => {
                    let badgeStatus;
                    let badgePriorityIcon;
                    let badgePriorityStyle: any;

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
                            badgePriorityStyle="text-errorRed dark:text-red-400 bg-errorRed bg-opacity-10";
                            break;
                        default: 
                            badgePriorityIcon = <FcLowPriority className="w-4 h-4" />;
                    }
                    return (
                        <TableRow key={task.id} className='dark:shadow-blue dark:shadow-md'>
                            <TableCell className="font-medium text-gray">{task.description}</TableCell>
                            <TableCell className='text-darkBlue dark:text-gray'>{task.description}</TableCell>
                            <TableCell><BadgeButton className={`flex justify-between gap-2 px-2 ${badgePriorityStyle}`}>{getPriorityName(task.priority)}{badgePriorityIcon}</BadgeButton></TableCell>
                            <TableCell><BadgeButton className={badgeStatus}>{getStatusName(task.status)}</BadgeButton></TableCell>
                            <TableCell>
                                <Link className="text-infoBlue" href={`/${user?.userId}/tasks/${task.id}/task`}>
                                    <SecondaryButton>{t("button.viewTask")}<FaCaretRight /></SecondaryButton>
                                </Link>
                            </TableCell>               
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
            </div>
        </>
    )
}
