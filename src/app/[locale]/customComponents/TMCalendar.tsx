import { Calendar } from "@/components/ui/calendar"
import { useDateContext } from "@/context/DateContext";

const TMCalendar = () => {
    const {newDate ,setNewDate} = useDateContext()
    
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