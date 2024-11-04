"use client"
 
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { FormControl, FormField, FormItem } from "@/components/ui/form"

interface DatePickType {
    placeholder?: string;
    label?:       string;
    name:         string;
}
 
const TMDatePicker = React.forwardRef<HTMLDivElement, DatePickType>(({placeholder, name, label}, ref) => {
  const {control} = useFormContext();

  return (
    <FormField 
        control={control} 
        name={name} 
        render={({ field }) => (
        <FormItem className="w-[-webkit-fill-available]">
          <FormControl ref={ref}>
            <div className="relative">
                <Popover>
                    <div className="flex flex-col w-[-webkit-fill-available] gap-2">
                        <Label>{label}</Label>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-auto justify-start flex text-left font-normal gap-2",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon />
                            {field.value ? format(new Date(field.value), "MM/dd/yyyy") : <span>{placeholder}</span>}
                            </Button>
                        </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-auto p-0 z-[70]">
                        <Calendar
                            className="rounded-lg bg-gray bg-opacity-10 text-blue"
                            classNames={{
                                day_selected: "bg-blue text-primary-foreground hover:bg-blue hover:text-primary-foreground focus:bg-blue focus:text-primary-foreground",
                            }}
                            mode="single"
                            initialFocus
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(selectedDate) => field.onChange(selectedDate?.toISOString())}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            </FormControl>
        </FormItem>
    )} />
  )
});

TMDatePicker.displayName = "TMDatePicker";

export default TMDatePicker;