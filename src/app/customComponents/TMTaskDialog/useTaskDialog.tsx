import { Status } from "../../../constants";
import { Priority } from "../../../constants";

const useTaskDialog = () => {
    const taskPriorityOption = [
        {name: "Low",    value: Priority.LOW},
        {name: "Middle", value: Priority.MIDDLE},
        {name: "High",   value: Priority.HIGH}
    ]

    const taskStatusOption = [
        {name: "Pending",     value: Status.PENDING},
        {name: "In progress", value: Status.IN_PROGRESS},
        {name: "Complete",    value: Status.COMPLETE}
    ]

    return {
        taskStatusOption,
        taskPriorityOption,
    }
}

export default useTaskDialog;