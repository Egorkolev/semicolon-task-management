import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ButtonLoading, PrimaryButton } from "./TMButton";
import TMAvatar from "./TMAvatar";
import { useTranslations } from "next-intl";

interface TMAvatarType {
  showAvatarDialog: boolean;
  isUploading: boolean;
  onClose: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onUpload: () => Promise<void>;
  userImage: string | undefined;
}

const TMAvatarDialog = ({ showAvatarDialog, onClose, onChange, onUpload, userImage, isUploading }: TMAvatarType) => {
  const t = useTranslations()
  return (
    <Dialog open={showAvatarDialog} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center text-center z-[60] dark:bg-slate-800 dark:shadow-blue dark:shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-darkBlue dark:text-gray m-2 p-0">
            {t("dialog.uploadPicture")}
          </DialogTitle>
          <DialogDescription>
            <TMAvatar logo={userImage} style="w-60 h-60" />
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input className="cursor-pointer dark:border-gray" onChange={onChange} type="file" />
          </div>
        </div>
        <DialogFooter>
          {isUploading ? <ButtonLoading label={t("button.pleaseWait")} className="bg-blue text-white" />
          : <PrimaryButton className="cursor-pointer" onClick={onUpload}>{t("button.uploadPicture")}</PrimaryButton>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TMAvatarDialog;
