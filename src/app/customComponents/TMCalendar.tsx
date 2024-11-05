import { Calendar } from "@/components/ui/calendar"
import { useDateContext } from "@/context/DateContext";
import { useState } from "react";

const TMCalendar = () => {
    const {newDate ,setNewDate} = useDateContext()
    // const [date, setDate] = useState<Date | undefined>()
    // const newDateISO = date?.toISOString().slice(0, 10);
    // console.log("newDateISO", newDateISO);
    
    // setNewDate(newDateISO);
    
    return (
        <Calendar
            mode="single"
            selected={newDate}
            onSelect={setNewDate}
            className="rounded-lg bg-gray bg-opacity-10 text-blue"
            classNames={{
                day_selected: "bg-blue text-primary-foreground hover:bg-blue hover:text-primary-foreground focus:bg-blue focus:text-primary-foreground",
            }}
        />
    )
}

export default TMCalendar;