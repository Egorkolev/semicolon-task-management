"use client";

import { BadgeButton, PrimaryButton } from "@/app/[locale]/customComponents/TMButton";
import { TMOverviewHeader } from "@/app/[locale]/customComponents/TMOverviewHeader";
import TMTaskDialog from "@/app/[locale]/customComponents/TMTaskDialog/TMTaskDialog";
import TMToast from "@/app/[locale]/customComponents/TMToast";
import TMTaskCard from "@/app/[locale]/customComponents/TMTaskCard";
import NoteImg from "../../../public/note.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Status } from "@/constants";
import TMTaskTable from "../../customComponents/TMTaskTable";
import { FaTableList } from "react-icons/fa6";
import { FaTableCells } from "react-icons/fa6";
import { TaskTypes } from "./types";

const ContainerView = (props: TaskTypes) => {
    const t = useTranslations();
    const { closeTaskDialog, openTaskDialog, register, handleOnSubmitTask, handleSubmit, setSelectedStatus, getStatusColor,
        form, showTaskDialog, responseData, showToast, taskData, filters, selectedStatus, taskView, handleViewTaskCard, handleViewTaskTable } = props;
        
    return (
        <div className="flex flex-col gap-5">
            <TMToast response={responseData} trigger={showToast} />
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <TMOverviewHeader
                    pageName={t("nav.tasks")}
                    welcomeText={t("message.yourTasksInYourSpace")}
                />
                {taskData?.length !== 0 && <PrimaryButton onClick={openTaskDialog}>{t("button.createTask")}</PrimaryButton>}
            </div>
            <div className="gap-4 flex justify-between items-start">
                <div className="md:flex hidden"></div>
                {taskData?.length !== 0 && 
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
                {taskData?.length !== 0 && <div className="flex gap-2 flex-wrap">
                    <FaTableCells 
                        onClick={handleViewTaskCard} 
                        className={`text-blue dark:text-gray bg-gray dark:bg-blue bg-opacity-10 w-7 h-7 lg:w-9 lg:h-9 p-1 rounded-md cursor-pointer
                        ${!taskView && "dark:text-white dark:bg-opacity-70 dark:shadow-blue dark:shadow-md shadow-md bg-opacity-40"}`
                    } />
                    <FaTableList 
                        onClick={handleViewTaskTable} 
                        className={`text-blue dark:text-gray dark:bg-blue bg-gray bg-opacity-10 w-7 h-7 lg:w-9 lg:h-9 p-1 rounded-md cursor-pointer
                        ${taskView && "dark:text-white dark:bg-opacity-70 dark:shadow-blue dark:shadow-md shadow-md bg-opacity-40"}`
                    }/>
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
            {!taskData?.length ?
            <div className="m-auto flex flex-col justify-center h-[50vh] items-center gap-2 text-center">
                <Image src={NoteImg} alt="No Task Img" width={150} height={150} style={{width: "auto"}} />
                <h2 className="text-darkBlue dark:text-gray text-2xl">{t("message.noTasksYet")}</h2>
                <p>{t("message.youHaveNoTaskCreated")}<br/>
                {t("message.createTaskNow")}</p>
                <PrimaryButton onClick={openTaskDialog}>{t("button.createTask")}</PrimaryButton>
            </div> :
            !taskView
            ? <TMTaskCard tasks={taskData} filters={selectedStatus} />
            : <TMTaskTable tasks={taskData} filters={selectedStatus} />}
        </div>
    );
};

export default ContainerView;