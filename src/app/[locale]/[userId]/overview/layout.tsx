"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GiTeamIdea } from "react-icons/gi";
import { GiDesk } from "react-icons/gi";
import { FaCaretRight } from "react-icons/fa6";
import { TMOverviewHeader } from "@/app/[locale]/customComponents/TMOverviewHeader";
import { BadgeButton, PrimaryButton } from "@/app/[locale]/customComponents/TMButton";
import { styles } from "@/styles/tailwindClasses";
import TMAvatarDialog from "@/app/[locale]/customComponents/TMAvatarDialog";
import TMToast from "@/app/[locale]/customComponents/TMToast";
import useOverview from "./useOverview";
import { useUserContext } from "@/context/UserContext";
import TMTaskDialog from "@/app/[locale]/customComponents/TMTaskDialog/TMTaskDialog";
import TMTaskCard from "@/app/[locale]/customComponents/TMTaskCard";
import { useTranslations } from "next-intl";

const Layout = () => {
    const t = useTranslations();
    const {userData} = useUserContext();
    const {handleUploadFile, handleFileChange, closeDialog, closeTaskDialog, openDialog, openTaskDialog, setSelectedValue, register, handleOnSubmitTask, handleSubmit,
    form, showAvatarDialog, showTaskDialog, responseData, showToast, taskData, selectedValue, isUploading} = useOverview();
    const startNotCompleted = !userData?.userImg || !taskData?.length;
    const startCompleted = userData?.userImg && taskData?.length !== 0;
    
    return (
        <div className="flex flex-col gap-5">
            <TMToast response={responseData} trigger={showToast} />
            <TMOverviewHeader
                welcomeText= {startNotCompleted ? t('message.wecometoSemicolon') : t('message.welcometoWorkspace')}
                textFrame={startNotCompleted ? 
                    t("message.motivationHelpYouWork") 
                    : <p dangerouslySetInnerHTML = {{__html: t.raw("message.churchill")}} />}
                userName={userData?.name} 
            />
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="text-darkBlue text-1xl font-bold">{startNotCompleted ? t('message.letGetYouStarted') : t('message.tasksForToday')}</h2>
                {startCompleted && <PrimaryButton onClick={openTaskDialog}>{t("button.createTask")}</PrimaryButton>}
            </div>
            
            <ToggleGroup className="flex flex-col gap-2" type="single" value={selectedValue} onValueChange={setSelectedValue}>
                {!userData?.userImg && <ToggleGroupItem className={styles.toggleGroupItem} value="a">
                    <GiTeamIdea className="text-blue bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                    <h3>{t("message.yourProfilePicture", {userName: userData?.name})}</h3>
                    <BadgeButton onClick={openDialog} type="button" className="hover:text-blue hover:bg-blue hover:bg-opacity-5">{t('button.getStarted')} <FaCaretRight /></BadgeButton>
                </ToggleGroupItem>}
                {!taskData?.length && <ToggleGroupItem className={styles.toggleGroupItem}  value="b">
                    <GiDesk className="text-blue bg-gray bg-opacity-10 w-8 h-8 p-1 rounded-md" />
                    <h3>{t("message.yourFirstTask")}</h3>
                    <BadgeButton onClick={openTaskDialog} type="button" className="hover:text-blue hover:bg-blue hover:bg-opacity-5">{t('button.getStarted')} <FaCaretRight /></BadgeButton>
                </ToggleGroupItem>}
            </ToggleGroup>
            {showAvatarDialog && 
                <TMAvatarDialog 
                    isUploading={isUploading}
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
                    dialogLabel={t('button.createTask')}
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