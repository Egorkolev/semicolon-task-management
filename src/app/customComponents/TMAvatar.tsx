import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AvatarLogo from "../public/avatar.png";
interface AvatarType {
    logo?: string;
    fallBack?: string;
    style?: string;
    onClick?: () => void;
}
const TMAvatar = ({logo, fallBack, style, onClick}: AvatarType) => {
    
    return (
        <Avatar onClick={onClick} className={`mx-auto rounded-lg ${style}`}>
            <div 
                className="absolute w-full h-full rounded-lg" 
                style={{
                    backgroundImage: `url(${logo || AvatarLogo.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
            </div>

            <AvatarFallback className="rounded-lg">{fallBack}</AvatarFallback>
        </Avatar>
    )
}

export default TMAvatar;