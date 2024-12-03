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
import TMTextArea from "@/app/[locale]/customComponents/TMTextArea";
import { PrimaryButton } from "../TMButton";
import useTaskDialog from "./useTaskDialog";
import TMSelect from "../TMSelect";
import TMDatePicker from "../TMDatePicker";
import { useTranslations } from "next-intl";
import { CharactersLimits } from "@/constants";

interface TMTaskType {
  showTaskDialog: boolean;
  dialogLabel: string
  onClose: () => void;
  register: UseFormRegister<any>;
  form: UseFormReturn<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleOnSubmit: (data: FormType) => Promise<void>;
}

const TMTaskDialog = ({form, showTaskDialog, dialogLabel, onClose, register, handleSubmit, handleOnSubmit}: TMTaskType) => {
  const t = useTranslations("taskForm");  
  const {taskPriorityOption, taskStatusOption} = useTaskDialog();
  return (
    <Dialog open={showTaskDialog} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center text-center z-[70] dark:bg-slate-800 dark:shadow-blue dark:shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-darkBlue dark:text-gray m-2 p-0">
            {dialogLabel}
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
                  required: t("taskNameRequired"),
                  minLength: {
                    value: CharactersLimits.InputMin,
                    message:
                      t("taskNameMinCharacters", {taskMinCharacters: CharactersLimits.InputMin}),
                  },
                  maxLength: {
                    value: CharactersLimits.TaskNameMax,
                    message: t("taskNameMaxCharacters", {taskMaxCharacters: CharactersLimits.TaskNameMax}),
                  },
                })}
                name="taskName"
                type="text"
                label={t("taskName")}
                placeholder={t("taskNamePlaceholder")}
                description={t("taskNameDescription")}
              />
              <div className="flex justify-between gap-4">
                <TMSelect 
                  {...register("taskPriority")}
                  placeholder={t("taskPriorityPlaceholder")}
                  label={t("taskPriority")}
                  option={taskPriorityOption}
                  name="taskPriority" 
                />
                <TMSelect 
                  {...register("taskStatus")}
                  placeholder={t("taskStatusPlaceholder")}
                  label={t("taskStatus")}
                  option={taskStatusOption}
                  name="taskStatus" 
                />
              </div>
              <div className="flex justify-between gap-4">
                <TMDatePicker
                  {...register("taskStartDate")}
                  placeholder={t("taskDatePlaceholder")}
                  label={t("taskStartDate")}
                  name="taskStartDate" 
                />
                <TMDatePicker 
                  {...register("taskEndDate")}
                  placeholder={t("taskDatePlaceholder")}
                  label={t("taskEndDate")}
                  name="taskEndDate" 
                />
              </div>
              <TMTextArea
                {...register("taskDescription", {
                  required: t("taskDescptionRequired"),
                  maxLength: {
                    value: CharactersLimits.TextAreaMax,
                    message: t("descptionMaxCharacters", {descptionMax: CharactersLimits.TextAreaMax}),
                  },
                })}
                name="taskDescription"
                label={t("taskDescriptionLabel")}
                description={t("taskDescription")}
              />
              <PrimaryButton type="submit" label={dialogLabel} />
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default TMTaskDialog;
