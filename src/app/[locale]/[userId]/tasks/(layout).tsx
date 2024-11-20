"use client";

import { PrimaryButton } from "@/app/[locale]/customComponents/TMButton";
import { TMOverviewHeader } from "@/app/[locale]/customComponents/TMOverviewHeader";
import TMTaskDialog from "@/app/[locale]/customComponents/TMTaskDialog/TMTaskDialog";
import TMToast from "@/app/[locale]/customComponents/TMToast";
import TMTaskCard from "@/app/[locale]/customComponents/TMTaskCard";
import NoteImg from "../../public/note.png";
import Image from "next/image";
import useTasks from "./useTasks";
import { useTranslations } from "next-intl";

const Layout = () => {
    const t = useTranslations();
    const { closeTaskDialog, openTaskDialog, register, handleOnSubmitTask, handleSubmit, setSelectedStatus,
        form, showTaskDialog, responseData, showToast, taskData, filters, selectedStatus } = useTasks();

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
            <div className="m-auto md:m-0">
                {taskData?.length !== 0 && <ul className="flex flex-wrap">
                    {filters.map((filter) => {
                        return (
                            <li 
                                onClick={() => setSelectedStatus(filter.status)}
                                key={filter.status} 
                                className={` md:pr-8 pr-2 py-3 text-sm lg:py-5 lg:text-lg cursor-pointer ${selectedStatus === filter.status ? "text-blue border-b-blue border-b-2" : "text-gray border-b-gray border-b-2"}`}
                            >
                                {filter.name}
                            </li>
                        ) 
                    })}
                </ul>}
            </div>
            {
                <TMTaskDialog 
                    dialogLabel={t("button.createTask")}
                    showTaskDialog={showTaskDialog}
                    onClose={closeTaskDialog} 
                    register={register}
                    handleSubmit={handleSubmit}
                    handleOnSubmit={handleOnSubmitTask}
                    form={form}
                />
            }
            {!taskData?.length ? 
            <div className="m-auto flex flex-col justify-center h-[50vh] items-center gap-2 text-center">
                <Image src={NoteImg} alt="No Task Img" width={150} height={150} style={{width: "auto"}} />
                <h2 className="text-darkBlue text-2xl">{t("message.noTasksYet")}</h2>
                <p>{t("message.youHaveNoTaskCreated")}<br/>
                {t("message.createTaskNow")}</p>
                <PrimaryButton onClick={openTaskDialog}>{t("button.createTask")}</PrimaryButton>
            </div>
            : <TMTaskCard tasks={taskData} filters={selectedStatus} />}
        </div>
    );
};

export default Layout;