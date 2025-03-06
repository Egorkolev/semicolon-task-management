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
import SpotlightCard from "@/lib/styles/SpotlightCard/SpotlightCard";

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
      <DialogContent className="p-0 sm:max-w-[425px] dark:bg-neutral-900">
        <SpotlightCard className="
          custom-spotlight-card w-full h-full p-5 flex flex-col justify-center 
          items-center text-center gap-2 z-[60]" spotlightColor="rgba(0, 229, 255, 0.2)"
        >
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
        </SpotlightCard>
      </DialogContent>
    </Dialog>
  );
};

export default TMAvatarDialog;
