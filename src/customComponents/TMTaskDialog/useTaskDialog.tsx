import { Priority, Status } from "@/constants";
import { useTranslations } from "next-intl";

const useTaskDialog = () => {
    const t = useTranslations("option");
    const taskPriorityOption = [
        {name: t("low"),    value: Priority.LOW},
        {name: t("middle"), value: Priority.MIDDLE},
        {name: t("high"),   value: Priority.HIGH}
    ]

    const taskStatusOption = [
        {name: t("pending"),     value: Status.PENDING},
        {name: t("inProgress"), value: Status.IN_PROGRESS},
        {name: t("complete"),    value: Status.COMPLETE}
    ]

    return {
        taskStatusOption,
        taskPriorityOption,
    }
}

export default useTaskDialog;