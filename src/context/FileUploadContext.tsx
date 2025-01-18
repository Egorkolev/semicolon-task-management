import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useTranslations } from "next-intl";
import { userAvatarFetch } from "@/lib/apiDataFetch/userFetch";

const FileContext = createContext<{
    file: File | null;
    responseData: any;
    showToast: boolean;
    isUploading: boolean;
    isImageUpload: boolean;
    showAvatarDialog: boolean;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadFile: () => Promise<void>;
    openDialog: () => void;
    closeDialog: () => void;
    setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
    setResponseData: any;
} | undefined>(undefined);

export const FileProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const t = useTranslations("warning");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<any>();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isImageUpload, setIsImageUpload] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [showAvatarDialog, setShowAvatarDialog] = useState<boolean>(false);
    const openDialog = () => setShowAvatarDialog(true);
    const closeDialog = () => setShowAvatarDialog(false);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = event.target.files?.[0];
        if(selectedFile) {
            const fileSizeInMB = selectedFile.size / (1024 * 1024);
            if(fileSizeInMB > 2) {
            setResponseData({warning: t("fileSize")});
            setShowToast(true);
            return;
            }
            setFile(selectedFile);
        }
    }, [t]);

    const handleUploadFile = useCallback(async() => {
        if (!file) {
            console.error("No file selected for upload");
            return;
        }
        setIsUploading(true);
        try {
            const response = await userAvatarFetch(file); 
            if(response) {
            setIsImageUpload((v) => !v);
            };
            setResponseData(response);
            setShowToast(true);
            closeDialog(); 
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setIsUploading(false);
        }
    }, [file]);

    return (
        <FileContext.Provider value={{
            file,
            responseData,
            showToast,
            isUploading,
            isImageUpload,
            showAvatarDialog,
            handleFileChange,
            handleUploadFile,
            openDialog,
            closeDialog,
            setShowToast,
            setResponseData,
        }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => {
    const context = useContext(FileContext);
    if(!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};