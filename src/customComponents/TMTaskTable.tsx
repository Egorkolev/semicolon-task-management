"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { FaCaretRight } from 'react-icons/fa'
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Priority, Status } from '@/constants'
import { useTranslations } from 'next-intl'
import { useDateContext } from '@/context/DateContext'
import useUserInfo from '@/hooks/useUserInfo'
import { BadgeButton, PrimaryButton } from './TMButton'
import { Link } from '@/i18n/routing'
import TMSearchInput from "./TMSearchInput"
import TMDropDown from "./TMDropDown"
import { TaskType } from "@/app/[locale]/[userId]/tasks/types"
import SpotlightCard from "@/lib/styles/SpotlightCard/SpotlightCard"

export default function TMTaskDataTable({ tasks, filters }: { tasks: TaskType[], filters: any }) {
    const t = useTranslations()
    const { dateISO } = useDateContext()
    const user = useUserInfo()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [filteredTasks, setFilteredTasks] = React.useState<TaskType[]>([])

    React.useEffect(() => {
        if (dateISO && filters) {
            if (filters !== Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => 
                    task?.startDate?.includes(dateISO) && task?.status === filters)
                setFilteredTasks(filtered)
            } else if (filters === Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => 
                    task?.startDate?.includes(dateISO))
                setFilteredTasks(filtered)
            } else {
                setFilteredTasks(tasks)
            }
        } else if (dateISO) {
            const filtered = tasks?.filter((task: TaskType) => 
                task?.startDate?.includes(dateISO))
            setFilteredTasks(filtered)
        } else if (filters) {
            if (filters !== Status.ALL) {
                const filtered = tasks?.filter((task: TaskType) => 
                    task?.status === filters)
                setFilteredTasks(filtered)
            } else {
                setFilteredTasks(tasks)
            }
        } else {
            setFilteredTasks(tasks)
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
    }

    const badgeStatus = (status: Status) => {
        const statusStyle: any = {
            [Status.PENDING]: "text-warningYellow bg-warningYellow bg-opacity-10",
            [Status.IN_PROGRESS]: "text-infoBlue bg-infoBlue bg-opacity-10",
            [Status.COMPLETE]: "text-successGreen bg-successGreen bg-opacity-10",
            default: "text-darkBlue bg-darkBlue bg-opacity-10"
        }
        return statusStyle[status] || statusStyle.default
    }

    const getPriorityName = (priority: Priority) => {
        const priorityName: any = {
            [Priority.LOW]: t("optionBadge.low"),
            [Priority.MIDDLE]: t("optionBadge.middle"),
            [Priority.HIGH]: t("optionBadge.high"),
            default: t("optionBadge.low")
        }
        return priorityName[priority] || priorityName.default
    }

    const badgePriorityIcon = (priority: Priority) => {
        const priorityIcon = {
            [Priority.LOW]: <FcLowPriority className="w-4 h-4" />,
            [Priority.MIDDLE]: <FcMediumPriority className="w-4 h-4" />,
            [Priority.HIGH]: <FcHighPriority className="w-4 h-4" />,
            default: <FcLowPriority className="w-4 h-4" />
        }
        return priorityIcon[priority] || priorityIcon.default
    }

    const badgePriorityStyle = (priority: Priority) => {
        const priorityStyle = {
            [Priority.LOW]: "text-successGreen bg-successGreen bg-opacity-10",
            [Priority.MIDDLE]: "text-warningYellow bg-warningYellow bg-opacity-10",
            [Priority.HIGH]: "text-errorRed dark:text-red-400 bg-errorRed bg-opacity-10"
        }
        return priorityStyle[priority]
    }

    const columns: ColumnDef<TaskType>[] = [
        {
            accessorKey: "title",
            header: t("taskTable.title"),
            cell: ({ row }) => (
                <div className="font-bold text-gray truncate max-w-56">
                    {row.getValue("title")}
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: t("taskTable.description"),
            cell: ({ row }) => (
                <div className="text-darkBlue dark:text-gray truncate max-w-52">
                    {row.getValue("description")}
                </div>
            ),
        },
        {
            accessorKey: "priority",
            header: t("taskTable.priority"),
            cell: ({ row }) => {
                const priority = row.getValue("priority") as Priority
                return (
                    <BadgeButton className={`flex justify-between gap-2 px-2 w-fit ${badgePriorityStyle(priority)}`}>
                        {getPriorityName(priority)}
                        {badgePriorityIcon(priority)}
                    </BadgeButton>
                )
            },
        },
        {
            accessorKey: "status",
            header: t("taskTable.status"),
            cell: ({ row }) => {
                const status = row.getValue("status") as Status
                return (
                    <BadgeButton className={badgeStatus(status)}>
                        {getStatusName(status)}
                    </BadgeButton>
                )
            },
        },
        {
            id: "actions",
            header: t("taskTable.action"),
            cell: ({ row }) => (
                <Link className="text-infoBlue" href={`/${user?.userId}/tasks/${row.original.id}/task`}>
                    <BadgeButton className="uppercase bg-blue bg-opacity-10 dark:bg-opacity-30 hover:bg-opacity-40 dark:hover:bg-opacity-60 text-infoBlue">
                        {t("button.viewTask")}<FaCaretRight />
                    </BadgeButton>
                </Link>
            ),
        },
    ]

    const table = useReactTable({
        data: filteredTasks,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div>
            <div className="flex items-center py-4 flex-wrap-reverse gap-2">
                <TMSearchInput
                    placeholder={t("taskTable.filterTitle") + '...'}
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event: any) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                />
                <TMDropDown table={table} label={t("taskTable.columns")} />
            </div>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <Table className="bg-white dark:bg-neutral-900">
                <TableHeader>
                    <TableRow>
                        {table.getHeaderGroups().map((headerGroup) => (
                            headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="font-bold">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="h-12">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                {t("taskTable.noResults")}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </SpotlightCard>

            <div className="flex justify-center md:justify-between py-2 gap-2 flex-wrap items-center">
                <div className="text-md text-gray">
                    {t("taskTable.pagination", {
                        from: table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
                        to: Math.min(
                            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                            filteredTasks.length
                        ),
                        total: filteredTasks.length
                    })}
                </div>

                <div className="flex gap-2">
                    <PrimaryButton
                        className="flex-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {t("button.previous")}
                    </PrimaryButton>
                    <PrimaryButton
                        className="flex-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {t("button.next")}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}