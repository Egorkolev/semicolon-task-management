import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarType {
    logo?: string;
    fallBack?: string;
    style?: string;
}
const TMAvatar = ({logo, fallBack, style}: AvatarType) => {
    return (
        <Avatar className={`mx-auto rounded-lg ${style}`}>
            <AvatarImage src={logo ? logo : "https://github.com/shadcn.png"} />
            <AvatarFallback className="rounded-lg">{fallBack}</AvatarFallback>
        </Avatar>
    )
}

export default TMAvatar;