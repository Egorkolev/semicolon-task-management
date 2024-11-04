interface FormType {
    taskName: string,
    taskDescription?: string;
    taskPriority?: string,
    taskStatus?: string,
    taskStartDate?: Date | number | null,
    taskEndDate?: Date | number | null,
}