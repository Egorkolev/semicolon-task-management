import DragDropColumn from "@/customComponents/TMD&D/dragDropColumn";
import { TaskType } from "@/app/[locale]/[userId]/tasks/[id]/task/types";
import {updateTaskStatusFetch} from "@/lib/apiDataFetch/taskFetch";
import TMToast from "@/customComponents/TMToast";
import React, { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { Status } from "@/constants";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
} from "@dnd-kit/core";

type ColumnsType = Record<Exclude<Status, Status.ALL>, TaskType[]>;

interface Props {
    tasks: TaskType[];
    onStatusUpdate?: (taskId: string, newStatus: Status) => Promise<void>;
}

const TMDragDrop: React.FC<Props> = ({ tasks, onStatusUpdate }) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const [columns, setColumns] = useState<ColumnsType>({
        [Status.PENDING]: [],
        [Status.IN_PROGRESS]: [],
        [Status.COMPLETE]: []
    });
    useEffect(() => {
        const filteredTasks = tasks.reduce<ColumnsType>((acc, task) => {
            const status = task.status as Exclude<Status, Status.ALL>;
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(task);
            return acc;
        }, {
            [Status.PENDING]: [],
            [Status.IN_PROGRESS]: [],
            [Status.COMPLETE]: []
        });
        setColumns(filteredTasks);
    }, [tasks]);

    const findColumnOfTask = (taskId: string | number) => {
        return Object.keys(columns).find((key) =>
            columns[key as keyof ColumnsType].some((task) => task.id === taskId)
        ) as keyof ColumnsType | undefined;
    };

    const handleDragStart = (event: { active: any }) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const sourceCol = findColumnOfTask(active.id);
        if (!sourceCol) return;

        const task = columns[sourceCol].find((t) => t.id === active.id);
        if (!task) return;

        const isColumnId = Object.keys(columns).includes(over.id.toString());

        let targetCol: keyof ColumnsType;

        if (isColumnId) {
            targetCol = over.id as keyof ColumnsType;
        } else {
            const taskTargetCol = findColumnOfTask(over.id);
            if (!taskTargetCol) return;
            targetCol = taskTargetCol;
        }

        if (sourceCol !== targetCol) {
            try {
                if (onStatusUpdate) {
                    await onStatusUpdate(task.id, targetCol);
                }

                const updatedTask = {
                    ...task,
                    status: targetCol,
                };

                const response = await updateTaskStatusFetch(task, targetCol);
                if(response.success) {
                    setColumns(prev => ({
                        ...prev,
                        [sourceCol]: prev[sourceCol].filter(t => t.id !== task.id),
                        [targetCol]: [...prev[targetCol], updatedTask]
                    }));
                }
                setResponseData(response);
                setShowToast(true);
            } catch (error) {
                console.error('Failed to update task status:', error);
            }
        } else {
            const oldIndex = columns[sourceCol].findIndex((t) => t.id === active.id);
            const newIndex = columns[sourceCol].findIndex((t) => t.id === over.id);

            setColumns(prev => ({
                ...prev,
                [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
            }));
        }
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <TMToast response={responseData} trigger={showToast} />
            <div className="flex gap-2 overflow-auto justify-between">
                {Object.entries(columns).map(([columnId, columnTasks]) => (
                    <DragDropColumn
                        key={columnId}
                        id={columnId}
                        tasks={columnTasks}
                        title={columnId.replace('_', ' ')}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default TMDragDrop;