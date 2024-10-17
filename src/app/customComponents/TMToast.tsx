import { useEffect } from "react";
import { toast } from "sonner";

const TMToast = ({ response, trigger }: any) => {
  useEffect(() => {
    if (trigger) {
      const messageType = response?.message
        ? "Success!"
        : response?.warning
        ? "Warning!"
        : response?.error
        ? "Error!"
        : "Notification";

        const toastStyle = 
        messageType === "Error!"
        ? "bg-errorRed text-white"
        : messageType === "Success!"
        ? "bg-successGreen text-white"
        : "bg-warningYellow text-black";

      const messageContent =
        response?.message || response?.warning || response?.error || "Something happened";

      toast(messageType, {
        className: toastStyle,
        description: messageContent,
        action: {  
          label: "Dismiss",
          onClick: () => console.log("Action dismissed"),
        },
      });
    }
  }, [trigger, response]);

  return null;
};

export default TMToast;