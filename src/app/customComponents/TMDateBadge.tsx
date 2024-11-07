import { Badge } from "@/components/ui/badge";

interface DateBadge {
    label?: string;
    date?: string | undefined;
    className?: string;
}

const TMDateBadge = ({ label, className, date = "Not selected" }: DateBadge) => {
  return (
    <div className="px-2 flex items-center justify-between gap-2">
      <div className="flex flex-col">
        <h2 className="text-sm text-gray-500">{label}</h2>
        <h2 className="text-md font-bold">{date}</h2>
      </div>
      <div className={`border-2 border-infoBlue bg-white rounded-full w-8 h-8 relative z-10`}>
        <Badge className={`${className} rounded-full w-6 h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
      </div>
    </div>
  );
}

export default TMDateBadge;