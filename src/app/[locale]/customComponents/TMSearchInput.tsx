"use client";
import React from "react";
import { Input } from "@/components/ui/input";

interface InputType {
  label?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | string;
  placeholder?: string;
  description?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange: (event: any) => void | undefined;
}

const TMSearchInput = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputType) => {
  return (
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        flex-1 sm:flex-none
        w-max
        border dark:border-infoBlue
        focus:ring-0
        focus:border[1px]
        focus:border-blue 
        focus:bg-blue
        focus:bg-opacity-5
        focus:outline-none 
        transition-colors 
        duration-200
        text-[16px]
        ${value && "border-blue bg-blue bg-opacity-5"}
      `}
    />
  );
};

export default TMSearchInput;