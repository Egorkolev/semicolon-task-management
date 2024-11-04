"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GiTeamIdea } from "react-icons/gi";
import { GiDesk } from "react-icons/gi";
import { FaCaretRight } from "react-icons/fa6";
import { TMOverviewHeader } from "@/app/customComponents/TMOverviewHeader";
import { BadgeButton, PrimaryButton } from "@/app/customComponents/TMButton";
import { styles } from "@/styles/tailwindClasses";
import TMAvatarDialog from "@/app/customComponents/TMAvatarDialog";
import TMToast from "@/app/customComponents/TMToast";
import useOverview from "./useOverview";
import { useUserContext } from "@/context/UserContext";
import TMTaskDialog from "@/app/customComponents/TMTaskDialog/TMTaskDialog";
import TMTaskCard from "@/app/customComponents/TMTaskCard";

const Layout = () => {
    const {userData} = useUserContext();
    const {handleUploadFile, handleFileChange, closeDialog, closeTaskDialog, openDialog, openTaskDialog, setSelectedValue, register, handleOnSubmitTask, handleSubmit,
    form, showAvatarDialog, showTaskDialog, responseData, showToast, taskData, selectedValue} = useOverview();
    const startNotCompleted = !userData?.userImg || !taskData?.length;
    const startCompleted = userData?.userImg && taskData?.length !== 0;
    
    return (
        <div className="flex flex-col gap-5">
            <TMToast response={responseData} trigger={showToast} />
            <TMOverviewHeader
                welcomeText= {startNotCompleted ? "Wecome to Semicolon Task Management." : "Welcome to your workspace."}
                textFrame={startNotCompleted ? 
                    ("Motivation to help you work.") 
                    : (<>Success is not final; failure is not fatal: It is the courage to <br/>continue that counts. <br/><br/>-Winston S. Churchill</>)}
                userName={userData?.name} 
            />
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="text-darkBlue text-1xl font-bold">{startNotCompleted ? "Let`s get you started" : "Tasks for Today."}</h2>
                {startCompleted && <PrimaryButton onClick={openTaskDialog}>Create Task</PrimaryButton>}
            </div>
            
            <ToggleGroup className="flex flex-col gap-2" type="single" value={selectedValue} onValueChange={setSelectedValue}>
                {!userData?.userImg && <ToggleGroupItem className={styles.toggleGroupItem} value="a">
                    <GiTeamIdea className="text-blue bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                    <h3>Hey {userData?.name}, Update your Profile Picture</h3>
                    <BadgeButton onClick={openDialog} type="button" className="hover:text-blue hover:bg-blue hover:bg-opacity-5">Get Started <FaCaretRight /></BadgeButton>
                </ToggleGroupItem>}
                {!taskData?.length && <ToggleGroupItem className={styles.toggleGroupItem}  value="b">
                    <GiDesk className="text-blue bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                    <h3>Create your First Task in your Workspace</h3>
                    <BadgeButton onClick={openTaskDialog} type="button" className="hover:text-blue hover:bg-blue hover:bg-opacity-5">Get Started <FaCaretRight /></BadgeButton>
                </ToggleGroupItem>}
            </ToggleGroup>
            {showAvatarDialog && 
                <TMAvatarDialog 
                    key={userData?.userImg}
                    userImage={userData?.userImg} 
                    onChange={handleFileChange} 
                    onUpload={handleUploadFile} 
                    onClose={closeDialog} 
                    showAvatarDialog={showAvatarDialog} 
                />
            }
            {
                <TMTaskDialog 
                    showTaskDialog={showTaskDialog}
                    onClose={closeTaskDialog} 
                    register={register}
                    handleSubmit={handleSubmit}
                    handleOnSubmit={handleOnSubmitTask}
                    form={form}
                />
            }
            <TMTaskCard tasks={taskData} />
        </div>
    );
};

export default Layout;