interface UserType {
    name:    string;
    email:   string;
    userImg: string;
}
interface TaskType {
    description: string | null;
    dueDate: string | null;
    id: string;
    priority: "LOW" | "MIDDLE" | "HIGH";
    startDate: string | null;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETE";
    title: string;
    workspaceId: string;
}