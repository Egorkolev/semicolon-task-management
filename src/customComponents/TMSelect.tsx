import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";

interface SelectType {
    name:        string;
    value:       string;
}

interface SelectedType {
    option:       SelectType[];
    placeholder?: string;
    name:         string;
    label?:       string;
}
 
const TMSelect = React.forwardRef<HTMLSelectElement, SelectedType>(({option, name, label, placeholder}, ref) => {
  const {control} = useFormContext();
  return (
    <FormField 
      control={control} 
      name={name} 
      render={({ field }) => (
    <FormItem className="w-[-webkit-fill-available]">
      <FormControl ref={ref}>
        <Select {...field} defaultValue={field.value} onValueChange={field.onChange}>
          <div className="flex flex-col w-[-webkit-fill-available] gap-2">
            <Label>{label}</Label>
            <SelectTrigger className={`w-auto ${field.value && "border-blue  bg-opacity-5"}`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </div>
          <SelectContent className="z-[70]">
            <SelectGroup>
              {option && option.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
       </FormControl>
      </FormItem>
    )} />
  )
});

TMSelect.displayName ="TMSelect";

export default TMSelect;