"use client";

import { BadgeButton, PrimaryButton, SecondaryButton } from "@/customComponents/TMButton";
import TMTaskDialog from "@/customComponents/TMTaskDialog/TMTaskDialog";
import { TMOverviewHeader } from "@/customComponents/TMOverviewHeader";
import StarBorder from "@/lib/styles/StarBorder/StarBorder";
import TMDragDrop from "@/customComponents/TMD&D/dragDrop";
import TMTaskTable from "@/customComponents/TMTaskTable";
import TMTaskCard from "@/customComponents/TMTaskCard";
import TmTooltip from "@/customComponents/TMTooltip";
import {Status, TaskViewOptions} from "@/constants";
import TMToast from "@/customComponents/TMToast";
import { RiDragDropLine } from "react-icons/ri";
import { FaTableCells } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import NoteImg from "@/public/note.png";
import { TaskTypes } from "./types";
import Image from "next/image";

const ContainerView = (props: TaskTypes) => {
    const t = useTranslations();
    const { closeTaskDialog, openTaskDialog, register, handleOnSubmitTask, handleSubmit, setSelectedStatus, getStatusColor,
        form, showTaskDialog, responseData, showToast, taskData, filters, selectedStatus, taskView,
        handleViewTaskDrag, handleViewTaskCard, handleViewTaskTable } = props;
        
    return (
        <div className="flex flex-col gap-5">
            <TMToast response={responseData} trigger={showToast} />
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <TMOverviewHeader
                    pageName={t("nav.tasks")}
                    welcomeText={t("message.yourTasksInYourSpace")}
                />
                {taskData?.length !== 0 && 
                    <StarBorder
                    as="button"
                    className="custom-class ml-auto rounded-sm"
                    color="cyan"
                    speed="6s"
                >
                    <SecondaryButton onClick={openTaskDialog}>{t("button.createTask")}</SecondaryButton>
                </StarBorder>
                }
            </div>
            <div className="gap-4 flex justify-between items-start flex-wrap">
                <div className="md:flex hidden"></div>
                {taskData?.length !== 0 && taskView !== TaskViewOptions.DRAG &&
                <ul className="flex gap-2 flex-wrap">
                    {filters.map((filter) => {
                        const count = taskData?.filter((task) => {
                            if(filter.status === Status.ALL) {
                                return taskData
                            } else {
                                return (task.status === filter.status)
                            }
                        }).length;

                        return (
                            <BadgeButton 
                                onClick={() => setSelectedStatus(filter.status)}
                                key={filter.status} 
                                className={`
                                    bg-${getStatusColor(filter.status)} dark:bg-blue relative flex-1
                                    m-auto lg:py-2 mb-0 md:mb-1 text-md cursor-pointer text-${getStatusColor(filter.status)} bg-opacity-10
                                    ${selectedStatus === filter.status 
                                    ? `dark:text-white dark:bg-opacity-70 dark:shadow-blue dark:shadow-md shadow-lg bg-opacity-30`
                                    : `dark:text-gray dark:bg-opacity-30`}
                                `}
                            >
                                {filter.name.toUpperCase()}
                                <span className={`text-white absolute -top-2.5 -right-2.5 bg-${getStatusColor(filter.status)} rounded-full py-0.5 px-1.5 text-xs`}>{count}</span>
                            </BadgeButton>
                        ) 
                    })}
                </ul>}
                {taskData?.length !== 0 && <div className="flex gap-2">
                    <TmTooltip label="Drag & Drop">
                        <RiDragDropLine
                            onClick={handleViewTaskDrag}
                            className={`text-blue dark:text-gray dark:bg-blue bg-gray bg-opacity-10 w-7 h-7 lg:w-9 lg:h-9 p-1 rounded-md cursor-pointer
                            ${(taskView === TaskViewOptions.DRAG) && "dark:text-white dark:bg-opacity-70 dark:shadow-blue dark:shadow-md shadow-md bg-opacity-40"}`
                        }/>
                    </TmTooltip>
                    <TmTooltip label="Card">
                        <FaTableCells
                            onClick={handleViewTaskCard}
                            className={`text-blue dark:text-gray bg-gray dark:bg-blue bg-opacity-10 w-7 h-7 lg:w-9 lg:h-9 p-1 rounded-md cursor-pointer
                            ${(taskView === TaskViewOptions.CARD) && "dark:text-white dark:bg-opacity-70 dark:shadow-blue dark:shadow-md shadow-md bg-opacity-40"}`
                        } />
                    </TmTooltip>
                    <TmTooltip label="Table">
                        <FaTableList
                            onClick={handleViewTaskTable}
                            className={`text-blue dark:text-gray dark:bg-blue bg-gray bg-opacity-10 w-7 h-7 lg:w-9 lg:h-9 p-1 rounded-md cursor-pointer
                            ${(taskView === TaskViewOptions.TABLE) && "dark:text-white dark:bg-opacity-70 dark:shadow-blue dark:shadow-md shadow-md bg-opacity-40"}`
                        }/>
                    </TmTooltip>
                </div>}
            </div>
            {<TMTaskDialog 
                dialogLabel={t("button.createTask")}
                showTaskDialog={showTaskDialog}
                onClose={closeTaskDialog} 
                register={register}
                handleSubmit={handleSubmit}
                handleOnSubmit={handleOnSubmitTask}
                form={form}
            />}
            {!taskData?.length ? (
            <div className="m-auto flex flex-col justify-center h-[50vh] items-center gap-2 text-center">
                <Image src={NoteImg} alt="No Task Img" width={150} height={150} style={{width: "auto"}} />
                <h2 className="text-darkBlue dark:text-gray text-2xl">{t("message.noTasksYet")}</h2>
                <p>{t("message.youHaveNoTaskCreated")}<br/>
                {t("message.createTaskNow")}</p>
                <PrimaryButton onClick={openTaskDialog}>{t("button.createTask")}</PrimaryButton>
            </div>) : (
            <>
                {(() => {
                    switch(taskView) {
                        case TaskViewOptions.CARD:
                            return <TMTaskCard tasks={taskData} filters={selectedStatus} />;
                        case TaskViewOptions.TABLE:
                            return <TMTaskTable tasks={taskData} filters={selectedStatus} />;
                        case TaskViewOptions.DRAG:
                            return <TMDragDrop tasks={taskData} />;
                        default:
                            return <TMTaskCard tasks={taskData} filters={selectedStatus} />;
                    }
                })()}
            </>)}
        </div>
    );
};

export default ContainerView;