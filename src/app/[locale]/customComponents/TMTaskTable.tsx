import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Priority, Status } from '@/constants';
import { useTranslations } from 'next-intl';
import { useDateContext } from '@/context/DateContext';
import useUserInfo from '@/hooks/useUserInfo';
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc';
import { BadgeButton, PrimaryButton } from './TMButton';
import { Link } from '@/i18n/routing';
import { FaCaretRight } from 'react-icons/fa';

export default function TMTaskTable({tasks, filters}: any) {
    const t = useTranslations();
    const [filteredTask, setFilteredTask] = useState<TaskType[]>();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const {dateISO} = useDateContext();
    const user = useUserInfo();
     
    useEffect(() => {
        if(dateISO && filters) {
            if(filters !== Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => task?.startDate?.includes(dateISO) && task?.status === filters);
                setFilteredTask(filtered);
            } else if(filters === Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => task?.startDate?.includes(dateISO));
                setFilteredTask(filtered);
            } else {
                setFilteredTask(tasks);
            }
        } else if(dateISO) {
            const filtered = tasks?.filter((task: TaskType) => task?.startDate?.includes(dateISO));
            setFilteredTask(filtered);
        } else if(filters) {
            if(filters !== Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => task?.status === filters);
                setFilteredTask(filtered);
            } else {
                setFilteredTask(tasks);
            }
        } else {
            setFilteredTask(tasks);
        }
    }, [dateISO, tasks, filters])

    const getStatusName = (status: Status) => {
        const statusName: any = {
            [Status.PENDING]: t("optionBadge.pending"),
            [Status.IN_PROGRESS]: t("optionBadge.inProgress"),
            [Status.COMPLETE]: t("optionBadge.complete"),
            default: t("optionBadge.pending")
        }
        return statusName[status] || statusName.default
    };

    const badgeStatus = (status: Status) => {
        const statusStyle: any = {
            [Status.PENDING]: "text-warningYellow bg-warningYellow bg-opacity-10",
            [Status.IN_PROGRESS]: "text-infoBlue bg-infoBlue bg-opacity-10",
            [Status.COMPLETE]: "text-successGreen bg-successGreen bg-opacity-10",
            default: "text-darkBlue bg-darkBlue bg-opacity-10"
        }
        return statusStyle[status] || statusStyle.default;
    };

    const getPriorityName = (priority: Priority) => {
        const priorityName: any = {
            [Priority.LOW]: t("optionBadge.low"),
            [Priority.MIDDLE]: t("optionBadge.middle"),
            [Priority.HIGH]: t("optionBadge.high"),
            default: t("optionBadge.low")
        }
        return priorityName[priority] || priorityName.default;
    };

    const badgePriorityIcon = (priority: Priority) => {
        const priorityIcon = {
            [Priority.LOW]: <FcLowPriority className="w-4 h-4" />,
            [Priority.MIDDLE]: <FcMediumPriority className="w-4 h-4" />,
            [Priority.HIGH]: <FcHighPriority className="w-4 h-4" />,
            default: <FcLowPriority className="w-4 h-4" />
        }
        return priorityIcon[priority] || priorityIcon.default;
    }

    const badgePriorityStyle = (priority: Priority) => {
        const priorityStyle = {
            [Priority.LOW]: "text-successGreen bg-successGreen bg-opacity-10",
            [Priority.MIDDLE]: "text-warningYellow bg-warningYellow bg-opacity-10",
            [Priority.HIGH]: "text-errorRed dark:text-red-400 bg-errorRed bg-opacity-10"
        }
        return priorityStyle[priority];
    }

    const table = useReactTable({
        data: filteredTask || [],
        columns: [
            {
                id: "title",
                header: t("taskTable.title"),
                cell: (info: any) => <TableCell className="font-bold text-gray truncate max-w-56">{info.row.original.title}</TableCell>
            },
            {
                id: "description",
                header: t("taskTable.description"),
                cell: (info: any) => <TableCell className='text-darkBlue dark:text-gray truncate max-w-52'>{info.row.original.description}</TableCell>
            },
            {
                id: "priority",
                header: t("taskTable.priority"),
                cell: (info: any) => <TableCell><BadgeButton className={`flex justify-between gap-2 px-2 ${badgePriorityStyle(info.row.original.priority)}`}>{getPriorityName(info.row.original.priority)}{badgePriorityIcon(info.row.original.priority)}</BadgeButton></TableCell>
            },
            {
                id: "status",
                header: t("taskTable.status"),
                cell: (info: any) => <TableCell><BadgeButton className={badgeStatus(info.row.original.status)}>{getStatusName(info.row.original.status)}</BadgeButton></TableCell>
            },
            {
                id: "action",
                header: t("taskTable.action"),
                cell: (info: any) => (
                    <TableCell>
                        <Link className="text-infoBlue" href={`/${user?.userId}/tasks/${info.row.original.id}/task`}>
                            <BadgeButton className='uppercase bg-blue bg-opacity-10 dark:bg-opacity-30 hover:bg-opacity-40 dark:hover:bg-opacity-60 text-infoBlue'>{t("button.viewTask")}<FaCaretRight /></BadgeButton>
                        </Link>
                    </TableCell>  
                )
            },
        ],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        manualPagination: false,
        pageCount: Math.ceil((filteredTask?.length || 0) / pagination.pageSize),
    });

    return (
        <>
            <div>
                <Table className='bg-white dark:bg-slate-600 mb-2 rounded-md dark:shadow-blue dark:shadow-md'>
                        <TableHeader>
                            <TableRow className='dark:shadow-blue dark:shadow-md'>
                                {table.getAllColumns().map((column: any) => (
                                    <TableHead key={column.id} className='font-bold'>{column.columnDef.header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className='dark:shadow-blue dark:shadow-md'>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="font-bold text-gray">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell> 
                                ))}   
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-center md:justify-between py-2 gap-2 flex-wrap items-center">
                    <div className="text-md text-gray">
                        {t(
                            "taskTable.pagination",
                            {
                                from: table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
                                to: Math.min(
                                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                    filteredTask?.length || 0
                                ),
                                total: filteredTask?.length
                            }
                        )}
                    </div>

                    <div className="flex gap-2">
                        <PrimaryButton
                            className='flex-1'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {t("button.previous")}
                        </PrimaryButton>
                        <PrimaryButton
                            className='flex-1'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {t("button.next")}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    )
}
