"use client";
import { useFormContext, FieldError } from "react-hook-form";
import React, { forwardRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
 
interface InputType {
    label?: string;
    name: string;
    placeholder?: string;
    description?: string;
  }
 
const TMTextArea = forwardRef<HTMLTextAreaElement, InputType>(({
    label,
    name,
    placeholder,
    description,
  }, ref) => {
    const {control, formState: {errors} } = useFormContext();
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            {...field}
                            ref={ref}
                            name={name}
                            placeholder={placeholder}
                            className={`
                            focus:ring-0
                            focus:border[1px]
                            focus:border-blue 
                            focus:bg-blue
                            focus:bg-opacity-5
                            focus:outline-none 
                            transition-colors 
                            duration-200
                            resize-none
                            text-[16px]
                            ${field.value && "border-blue bg-blue bg-opacity-5"}
                            `}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage  className="text-errorRed dark:text-red-500">
                        {errors[name]?.message && (<p className="text-errorRed dark:text-red-500">{(errors[name] as FieldError).message}</p>)}
                    </FormMessage>
                </FormItem>
            )}
            />
        </div>
    )
});

TMTextArea.displayName = "TMTextArea";

export default TMTextArea;