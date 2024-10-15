import { NextResponse } from "next/server";
import jwt, {JwtPayload} from "jsonwebtoken";
import { apiKeys } from "@/lib/apiKeys";

export async function POST(req: Request) {
    const {token} = await req.json();
    const publicKey = apiKeys.RSA_PUBLIC_KEY_PEM;
    const privateKey = apiKeys.RSA_PRIVATE_KEY_PEM;

    try{
        const decoded = jwt.verify(
            token,
            publicKey,
            { algorithms: ["RS256"] },
        ) as JwtPayload;
        

        const newAccessToken = jwt.sign(
            {userId: decoded.userId, email: decoded.email},
            privateKey,
            {algorithm: 'RS256', expiresIn: '1h'}
        );

        return NextResponse.json({accessToken: newAccessToken, access: true}, {status: 200});
    } catch (error) {
        console.error('Error refreshing token:', error);
        return NextResponse.json({error: 'Invalid refresh token', access: false}, {status: 401});
    }
}