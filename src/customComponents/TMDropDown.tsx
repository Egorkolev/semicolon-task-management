import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from 'react';

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
                    className="rounded-sm ml-auto"
                    variant="outline"
                >
                    {label} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dark:bg-neutral-800' align="end">
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
