import { TaskType } from "@/app/[locale]/[userId]/overview/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

const TaskContext = createContext<{
    taskData: TaskType[] | null;
    setTaskData: React.Dispatch<React.SetStateAction<TaskType[] | null>>;
} | undefined>(undefined);

export const TaskProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [taskData, setTaskData] = useState<TaskType[] | null>(null);

    return (
        <TaskContext.Provider value={{taskData, setTaskData}}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};