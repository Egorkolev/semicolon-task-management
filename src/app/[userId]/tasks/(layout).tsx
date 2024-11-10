"use client";

import { PrimaryButton } from "@/app/customComponents/TMButton";
import { TMOverviewHeader } from "@/app/customComponents/TMOverviewHeader";
import TMTaskDialog from "@/app/customComponents/TMTaskDialog/TMTaskDialog";
import TMToast from "@/app/customComponents/TMToast";
import TMTaskCard from "@/app/customComponents/TMTaskCard";
import NoteImg from "../../public/note.png";
import Image from "next/image";
import useTasks from "./useTasks";

const Layout = () => {
    const { closeTaskDialog, openTaskDialog, register, handleOnSubmitTask, handleSubmit, setSelectedStatus,
        form, showTaskDialog, responseData, showToast, taskData, filters, selectedStatus } = useTasks();

    return (
        <div className="flex flex-col gap-5">
            <TMToast response={responseData} trigger={showToast} />
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <TMOverviewHeader
                    pageName="Tasks"
                    welcomeText="Your tasks in your space."
                />
                {taskData?.length !== 0 && <PrimaryButton onClick={openTaskDialog}>Create Task</PrimaryButton>}
            </div>
            <div>
                {taskData?.length !== 0 && <ul className="flex flex-wrap">
                    {filters.map((filter) => {
                        return (
                            <li 
                                onClick={() => setSelectedStatus(filter.status)}
                                key={filter.status} 
                                className={` pr-8 py-3 lg:py-5 lg:text-lg cursor-pointer ${selectedStatus === filter.status ? "text-blue border-b-blue border-b-2" : "text-gray border-b-gray border-b-2"}`}
                            >
                                {filter.name}
                            </li>
                        ) 
                    })}
                </ul>}
            </div>
            {
                <TMTaskDialog 
                    dialogLabel="Create Task"
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
                <h2 className="text-darkBlue text-2xl">No Tasks Yet</h2>
                <p>You have no task created in your workspace yet.<br/>
                Get productive. Create a Task Now.</p>
                <PrimaryButton onClick={openTaskDialog}>Create Task</PrimaryButton>
            </div>
            : <TMTaskCard tasks={taskData} filters={selectedStatus} />}
        </div>
    );
};

export default Layout;