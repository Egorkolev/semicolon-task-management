import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";

const TMCalendar = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg bg-gray bg-opacity-10 text-blue"
            classNames={{
                day_selected: "bg-blue text-primary-foreground hover:bg-blue hover:text-primary-foreground focus:bg-blue focus:text-primary-foreground",
            }}
        />
    )
}

export default TMCalendar;