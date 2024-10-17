import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";

interface UserType {
    userId: string; 
    email: string; 
    name: string;
}
const useUserInfo = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserId = async () => {
            const token = localStorage.getItem("accessToken") as string;
            if(!token) {
                router.push("/login");
                return;
            }
            const decodedToken = jwt.decode(token) as JwtPayload | null;
            const {userId, email, name} = (decodedToken as JwtPayload);
            const userData: UserType = {userId: userId, email: email, name: name}
            setUser(userData);
        }
        fetchUserId();
    }, [router])
    return user;
}

export default useUserInfo;