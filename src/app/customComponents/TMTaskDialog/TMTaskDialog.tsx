import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TMInput from "../TMInput";
import { FormProvider, UseFormHandleSubmit, UseFormRegister, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TMTextArea from "@/app/customComponents/TMTextArea";
import { PrimaryButton } from "../TMButton";
import useTaskDialog from "./useTaskDialog";
import TMSelect from "../TMSelect";
import TMDatePicker from "../TMDatePicker";

interface TMTaskType {
  showTaskDialog: boolean;
  onClose: () => void;
  register: UseFormRegister<any>;
  form: UseFormReturn<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleOnSubmit: (data: FormType) => Promise<void>;
}

const TMTaskDialog = ({form, showTaskDialog, onClose, register, handleSubmit, handleOnSubmit}: TMTaskType) => {
    const {taskPriorityOption, taskStatusOption} = useTaskDialog();
  return (
    <Dialog open={showTaskDialog} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center text-center z-[70]">
        <DialogHeader>
          <DialogTitle className="text-darkBlue m-2 p-0">
            Create Task
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className="space-y-8 flex-1 w-full text-left"
            >
              <TMInput
                {...register("taskName", {
                  required: "Task name is required",
                  minLength: {
                    value: 2,
                    message:
                      "Task code must be at least 2 characters long",
                  },
                  maxLength: {
                    value: 6,
                    message: "Task code cannot exceed 6 characters",
                  },
                })}
                name="taskName"
                type="text"
                label="Task code"
                placeholder="T-25"
                description="Enter task code"
              />
              <div className="flex justify-between gap-4">
                <TMSelect 
                  {...register("taskPriority")}
                  placeholder="Select Priority"
                  label="Priority"
                  option={taskPriorityOption}
                  name="taskPriority" 
                />
                <TMSelect 
                  {...register("taskStatus")}
                  placeholder="Select Status"
                  label="Status"
                  option={taskStatusOption}
                  name="taskStatus" 
                />
              </div>
              <div className="flex justify-between gap-4">
                <TMDatePicker
                  {...register("taskStartDate")}
                  placeholder="Pick a date"
                  label="Start Date"
                  name="taskStartDate" 
                />
                <TMDatePicker 
                  {...register("taskEndDate")}
                  placeholder="Pick a date"
                  label="End Date"
                  name="taskEndDate" 
                />
              </div>
              <TMTextArea
                {...register("taskDescription", {
                  required: "Descption is required",
                  maxLength: {
                    value: 200,
                    message: "Descption cannot exceed 200 characters long",
                  },
                })}
                name="taskDescription"
                label="Description"
                description="Description of your task"
              />
              <PrimaryButton type="submit" label="Create Task" />
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default TMTaskDialog;
