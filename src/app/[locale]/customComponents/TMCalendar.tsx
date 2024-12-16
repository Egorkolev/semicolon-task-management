import { Calendar } from "@/components/ui/calendar"
import { useDateContext } from "@/context/DateContext";
import useOverview from "../[userId]/overview/useOverview";
import { useEffect, useState } from "react";

const TMCalendar = () => {
    const [taskDates, setTaskDates] = useState<string[]>([]);
    const {taskData} = useOverview();
    const {newDate ,setNewDate} = useDateContext();

    useEffect(() => {
        if(taskData){
            const dates = taskData?.map((task) => new Date(task.startDate!).toISOString().slice(0, 10))
            setTaskDates(dates); 
        }
    }, [taskData])

    return (
        <Calendar
            mode="single"
            selected={newDate}
            onSelect={setNewDate}
            className="rounded-lg bg-gray dark:bg-slate-800 bg-opacity-10 text-blue"
            classNames={{
                day_selected: "bg-blue text-primary-foreground hover:bg-blue hover:text-primary-foreground focus:bg-blue focus:text-primary-foreground",
            }}
        />
    )
}

export default TMCalendar;
