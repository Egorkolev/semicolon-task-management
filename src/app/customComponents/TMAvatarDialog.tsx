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
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "./TMButton";
import TMAvatar from "./TMAvatar";

interface TMAvatarType {
  showAvatarDialog: boolean;
  onClose: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onUpload: () => Promise<void>;
  userImage: string | undefined;
}

const TMAvatarDialog = ({ showAvatarDialog, onClose, onChange, onUpload, userImage }: TMAvatarType) => {
  return (
    <Dialog open={showAvatarDialog} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center text-center z-[60]">
        <DialogHeader>
          <DialogTitle className="text-darkBlue m-2 p-0">
            Upoad your Profile Picture
          </DialogTitle>
          <DialogDescription>
            <TMAvatar logo={userImage} style="w-60 h-60" />
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture"></Label>
            <Input className="cursor-pointer" onChange={onChange} id="picture" type="file" />
          </div>
        </div>
        <DialogFooter>
          <PrimaryButton onClick={onUpload}>Upoad Picture</PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TMAvatarDialog;
