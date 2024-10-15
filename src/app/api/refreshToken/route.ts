import { NextResponse } from "next/server";
import jwt, {JwtPayload} from "jsonwebtoken";
import fs from "fs";

export async function POST(req: Request) {
    const {token} = await req.json();
    const publicKey = fs.readFileSync('public.pem', 'utf8');
    const privateKey = fs.readFileSync('private.pem', 'utf8');

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