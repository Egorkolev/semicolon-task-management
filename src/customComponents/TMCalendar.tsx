"use client";
import { Calendar } from "@/components/ui/calendar"
import { useDateContext } from "@/context/DateContext";
import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";

const TMCalendar = () => {
    const [taskDates, setTaskDates] = useState<Date[]>([]);
    const {taskData} = useTaskContext();
    const {newDate, setNewDate} = useDateContext();

    useEffect(() => {
        if(taskData){
            const dates = taskData?.map((task) => new Date(task.startDate!));
            setTaskDates(dates);
        }
    }, [taskData])

    return (
        <Calendar
            mode="single"
            selected={newDate}
            onSelect={setNewDate}
            className="rounded-lg bg-gray bg-opacity-20 dark:bg-neutral-900 dark:bg-opacity-100 text-blue"
            modifiers={{
                booked: taskDates,
            }}
            modifiersClassNames={{
                booked: "relative after:content-[''] after:w-1.5 after:h-1.5 after:bg-red-400 after:rounded-full after:absolute after:top-0 after:right-0 after:-translate-x-1/2"
            }}
            classNames={{
                day_selected: "bg-blue text-primary-foreground hover:bg-blue hover:text-primary-foreground focus:bg-blue focus:text-primary-foreground",
            }}
        />
    )
}

export default TMCalendar;
