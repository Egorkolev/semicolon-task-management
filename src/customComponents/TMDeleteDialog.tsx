import SpotlightCard from "@/lib/styles/SpotlightCard/SpotlightCard";
import StarBorder from "@/lib/styles/StarBorder/StarBorder";
import { Button } from "@/components/ui/button";
import { SecondaryButton } from "./TMButton";
import { useTranslations } from "next-intl";
import { Status } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TMDeleteType {
  taskStatus: string | undefined;
  onClick: () => Promise<void>;
  taskName: string | undefined;
  showDeleteDialog: boolean;
  onClose: () => void;
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
      <DialogContent className="p-0 sm:max-w-[425px] flex flex-col justify-between items-start text-center z-[60] dark:bg-neutral-900">
        <SpotlightCard className="custom-spotlight-card w-full h-full p-5" spotlightColor="rgba(0, 229, 255, 0.2)">
          <DialogHeader>
            <DialogTitle className="text-darkBlue dark:text-gray text-xl my-2 p-0">
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
            <StarBorder
              as="button"
              className="custom-class w-full"
              color="cyan"
              speed="3s"
            >
              <SecondaryButton onClick={onClose} className="w-full">
                {t("button.no")}
              </SecondaryButton>
            </StarBorder>
            <Button onClick={onClick} className="text-errorRed bg-errorRed bg-opacity-10 hover:bg-errorRed hover:bg-opacity-20 w-full">
              {t("button.yes")}
            </Button>
          </DialogFooter>
        </SpotlightCard>
      </DialogContent>
    </Dialog>
  );
};

export default TMDeleteDialog;
