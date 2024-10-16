import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

const useUserId = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const token = localStorage.getItem("accessToken") as string;
            const decodedToken = jwt.decode(token);
            const userId = (decodedToken as JwtPayload)?.userId;
            setUserId(userId);
        }
        fetchUserId();
    }, [])
    return userId;
}

export default useUserId;