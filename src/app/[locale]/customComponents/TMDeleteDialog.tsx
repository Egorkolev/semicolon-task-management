import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Status } from "@/constants";

interface TMDeleteType {
  showDeleteDialog: boolean;
  onClose: () => void;
  onClick: () => Promise<void>;
  taskName: string | undefined;
  taskStatus: string | undefined;
}

const TMDeleteDialog = ({ showDeleteDialog, onClose, onClick, taskName, taskStatus }: TMDeleteType) => {
  const t = useTranslations();

  const getStatusName = (status: typeof taskStatus) => {
    switch (status) {
        case Status.PENDING:
            return t("optionBadge.pending");
        case Status.IN_PROGRESS:
            return t("optionBadge.inProgress");
        case Status.COMPLETE:
            return t("optionBadge.complete");
        default:
            return t("optionBadge.pending");
    }
};

  return (
    <Dialog open={showDeleteDialog} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-between items-start text-center z-[60]">
        <DialogHeader>
          <DialogTitle className="text-darkBlue text-xl my-2 p-0">
            {t("dialog.deleteTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("dialog.taskName")}{' '}
            <span className="font-bold">{taskName}</span>
            ? {t("dialog.taskStatus")} <span className="font-bold">{getStatusName(taskStatus)}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
        </div>
        <DialogFooter className="flex flex-row flex-nowrap w-full gap-2">
          <Button onClick={onClose} className="text-white bg-blue bg-opacity-90 hover:bg-blue hover:bg-opacity-100 w-full">
            {t("button.no")}
          </Button>
          <Button onClick={onClick} className="text-errorRed bg-errorRed bg-opacity-10 hover:bg-errorRed hover:bg-opacity-20 w-full">
            {t("button.yes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TMDeleteDialog;
