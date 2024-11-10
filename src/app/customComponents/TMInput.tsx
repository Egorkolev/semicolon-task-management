"use client";
import React, {forwardRef} from "react";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormDescription,
  FormField,
} from "@/components/ui/form";
import { useFormContext, FieldError } from "react-hook-form";

interface InputType {
  label?: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | string;
  placeholder?: string;
  description?: string;
  icon?: React.ReactNode;
}

const TMInput = forwardRef<HTMLInputElement, InputType>(({
  label,
  name,
  type,
  placeholder,
  description,
  icon,
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
            <div className="relative">
              <Input
                {...field}
                ref={ref}
                name={name}
                type={type}
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
                  ${field.value && "border-blue bg-blue bg-opacity-5"}
                `}
              />
              {icon && <span className="absolute bottom-2 right-4 cursor-pointer">{icon}</span>}
            </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage>
              {errors[name]?.message && (<p className="text-errorRed">{(errors[name] as FieldError).message}</p>)}
            </FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
});

TMInput.displayName = "TMInput";

export default TMInput;