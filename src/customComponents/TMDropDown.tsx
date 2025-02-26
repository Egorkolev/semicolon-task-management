import React from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTranslations } from 'next-intl';

function TMDropDown({table, label}: {table: any, label: string}) {
    const t = useTranslations();

    const columnHeaders = {
        title: t("taskTable.title"),
        description: t("taskTable.description"),
        priority: t("taskTable.priority"),
        status: t("taskTable.status"),
        actions: t("taskTable.action")
    }
    return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="outline" 
                    className="
                    ml-auto       
                    bg-blue 
                    rounded-lg 
                    opacity-90 
                    hover:opacity-100
                    hover:bg-blue
                    shadow-xl
                    text-white
                    dark:text-gray
                    hover:text-white"
                >
                    {label} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dark:bg-slate-600' align="end">
                {table
                    .getAllColumns()
                    .filter((column: any) => column.getCanHide())
                    .map((column: any) => {
                        const headerText = columnHeaders[column.id as keyof typeof columnHeaders] || column.id
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {headerText}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default TMDropDown;
