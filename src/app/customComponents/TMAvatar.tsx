import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarLogo from "../public/avatar.png";
import { useEffect } from "react";

interface AvatarType {
    logo?: string;
    fallBack?: string;
    style?: string;
}
const TMAvatar = ({logo, fallBack, style}: AvatarType) => {
    
    return (
        <Avatar className={`mx-auto rounded-lg ${style}`}>
            <AvatarImage src={logo || AvatarLogo.src} />
            <AvatarFallback className="rounded-lg">{fallBack}</AvatarFallback>
        </Avatar>
    )
}

export default TMAvatar;