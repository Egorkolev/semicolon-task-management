import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface DateBadge {
    label?: string;
    date?: string | undefined;
    className?: string;
    classNameDueDate?: string;
}

const TMDateBadge = ({ label, className, classNameDueDate, date }: DateBadge) => {
  const t = useTranslations();
  return (
    <div className={`${classNameDueDate} items-center justify-between md:w-full gap-2`}>
      <div className="flex flex-col">
        <h2 className="text-sm md:text-md text-gray-500 dark:text-gray truncate w-16 md:w-auto">{label}</h2>
        <h2 className="text-sm md:text-md font-bold dark:text-gray truncate">{date ?? t("message.unselected")}</h2>
      </div>
      <div className={`border-2 border-infoBlue bg-white dark:text-gray rounded-full w-6 h-6 md:w-8 md:h-8 relative z-10`}>
        <Badge className={`${className} rounded-full w-6 h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
      </div>
    </div>
  );
}

export default TMDateBadge;