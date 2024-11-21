import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserType {
    userId: string; 
    email: string; 
    name: string;
}
const useUserInfo = () => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const token = localStorage.getItem("accessToken") as string;
            if(!token) {
                setUser(null);
            } else {
                const decodedToken = jwt.decode(token) as JwtPayload | null;
                const {userId, email, name} = (decodedToken as JwtPayload);
                const userData: UserType = {userId: userId, email: email, name: name}
                setUser(userData);
            }
        }
        fetchUserId();
        window.addEventListener("storage", fetchUserId);

        return () => {
            window.removeEventListener("storage", fetchUserId);
        };
    }, [])
    return user;
}

export default useUserInfo;