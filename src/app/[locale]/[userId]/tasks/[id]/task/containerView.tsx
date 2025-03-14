import { BadgeButton, SecondaryButton } from "@/customComponents/TMButton";
import TMTaskDialog from "@/customComponents/TMTaskDialog/TMTaskDialog";
import { TMOverviewHeader } from "@/customComponents/TMOverviewHeader";
import SpotlightCard from "@/lib/styles/SpotlightCard/SpotlightCard";
import TMDeleteDialog from "@/customComponents/TMDeleteDialog";
import StarBorder from "@/lib/styles/StarBorder/StarBorder";
import TMBreadcrumb from "@/customComponents/TMBreadcrumb";
import TMDateBadge from "@/customComponents/TMDateBadge";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import TMToast from "@/customComponents/TMToast";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FiTrash } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { Status } from "@/constants";
import { TaskTypes } from "./types";

const ContainerView = (props: TaskTypes) => {
    const t = useTranslations();
    const { getPriorityClass, getPriorityIcon, getButtonStatus, getBadgeClass, getButtonText, openDeleteDialog, openTaskDialog, getStatusName,
    handleDeleteTask, closeDeleteDialog, handleChangeStatus, handleOnSubmitTask, handleSubmit, register, closeTaskDialog, getPriorityName,
    form, showTaskDialog, showDeleteDialog, responseData, showToast, userId, task } = props;

    return (
        <div>
            <TMToast response={responseData} trigger={showToast} />
            <TMTaskDialog
                dialogLabel={t("dialog.updateTask")}
                showTaskDialog={showTaskDialog}
                onClose={closeTaskDialog} 
                register={register}
                handleSubmit={handleSubmit}
                handleOnSubmit={handleOnSubmitTask}
                form={form}
            />
            <TMDeleteDialog 
                showDeleteDialog={showDeleteDialog} 
                onClose={closeDeleteDialog} 
                onClick={handleDeleteTask} 
                taskName={task?.title}
                taskStatus={task?.status}
            />
            <TMOverviewHeader
                pageName={<TMBreadcrumb breadCrumbHref={`../`} breadCrumbLink={t("nav.tasks")} breadCrumbPage={`${t("nav.task")}: ${task?.title}`} />}
            />
            <div className="pb-10 px-3">
                <SpotlightCard className="custom-spotlight-card max-w-3xl flex justify-between flex-wrap gap-10 overflow-auto m-auto mt-10" spotlightColor="rgba(0, 229, 255, 0.2)">
                {task && 
                <div className="flex-1 flex flex-wrap gap-6 p-4 md:p-6 justify-between bg-white dark:bg-neutral-900 w-[340px] rounded-sm">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-gray text-lg">{task.title}</h2>
                        <div className="flex gap-2 items-center">
                            <BadgeButton className={getBadgeClass(task.status)}>{getStatusName(task.status)}</BadgeButton>
                            <BadgeButton 
                                className={`flex justify-between gap-2 px-2 ${getPriorityClass(task.priority)}`}
                            >
                                {getPriorityName(task.priority)}{getPriorityIcon(task.priority)}
                            </BadgeButton>
                        </div>
                        <div className="text-darkBlue dark:text-gray max-w-[370px]">
                            {task.description}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <StarBorder
                                as="button"
                                className="custom-class"
                                color="cyan"
                                speed="6s"
                            >
                                <SecondaryButton
                                    onClick={() => handleChangeStatus(task)}
                                    className={`${getButtonStatus(task.status)} items-center flex gap-2`}
                                >
                                    {task.status === Status.COMPLETE && <IoCheckmarkDoneCircle className="w-8 h-8" />}
                                    {getButtonText(task.status)}
                                </SecondaryButton>
                            </StarBorder>
                            <div className="flex items-center gap-2 flex-nowrap">
                                <Button onClick={openDeleteDialog} className="px-2 bg-errorRed bg-opacity-10 hover:bg-errorRed hover:bg-opacity-20">
                                    <FiTrash className="w-5 h-5 text-errorRed dark:text-red-400" />
                                </Button>
                                <Button onClick={openTaskDialog} className="px-2 bg-blue bg-opacity-10 hover:bg-blue hover:bg-opacity-20">
                                    <FiEdit className="w-5 h-5 text-blue dark:text-infoBlue" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 items-end flex md:flex-col justify-between w-full md:w-fit">
                        <TMDateBadge classNameDueDate="flex" className="bg-white dark:bg-gray" label={t("dialog.createdDate")} date={task.startDate?.slice(0, 10)} />
                            <div className="relative">
                                <div className="absolute h-px md:w-px min-w-16 md:min-w-fit md:min-h-24 right-[-52px] md:right-[-3px] -top-[40px] md:-top-[68px] bg-gray m-5"></div>
                            </div>
                        <TMDateBadge classNameDueDate="flex flex-row-reverse md:flex-row" className="bg-infoBlue" label={t("dialog.dueDate")} date={task.dueDate?.slice(0, 10)} />
                    </div>
                </div>}
            </SpotlightCard>
            </div>
        </div>
    );
};

export default ContainerView;