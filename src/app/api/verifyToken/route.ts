import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { apiKeys } from "@/lib/apiKeys";

export async function POST(req: Request) {
    const { token } = await req.json()
    try {
        const publicKey = apiKeys.RSA_PUBLIC_KEY_PEM.replace(/\\n/g, '\n');
        const verified = jwt.verify(
            token,
            publicKey,
            { algorithms: ["RS256"] },
        );
        
        if(verified) {
            return NextResponse.json({
                message: 'Welcome back!',
                verified: true,
            }, {status: 200});
        }

    } catch (error: any) {
        console.error("Session expired, please log in again", error as Error);
        if (error && error.name === "JsonWebTokenError") {
            return NextResponse.json({
                message: 'Session expired, please log in again',
                verified: false,
                error: error.message,
            }, {status: 401});
        }
    }
}
