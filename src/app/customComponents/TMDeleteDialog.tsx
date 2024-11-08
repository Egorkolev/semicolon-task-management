import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PrimaryButton } from "./TMButton";
import { Button } from "@/components/ui/button";

interface TMDeleteType {
  showDeleteDialog: boolean;
  onClose: () => void;
  onClick: () => Promise<void>;
  taskName: string | undefined;
  taskStatus: string | undefined;
}

const TMDeleteDialog = ({ showDeleteDialog, onClose, onClick, taskName, taskStatus }: TMDeleteType) => {
  return (
    <Dialog open={showDeleteDialog} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-between items-start text-center z-[60]">
        <DialogHeader>
          <DialogTitle className="text-darkBlue text-xl my-2 p-0">
            Delete Task
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the task{' '}
            <span className="font-bold">{taskName}</span>{' '}
            ? This task is <span className="font-bold">{taskStatus}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="text-white bg-blue bg-opacity-90 hover:bg-blue hover:bg-opacity-100">
              No
          </Button>
          <Button onClick={onClick} className="text-errorRed bg-errorRed bg-opacity-10 hover:bg-errorRed hover:bg-opacity-20">
              Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TMDeleteDialog;
