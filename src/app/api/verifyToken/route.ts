import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";

export async function POST(req: Request) {
    const {token} = await req.json()
    try {
        const publicKey = fs.readFileSync('public.pem', 'utf8');
        const verified = jwt.verify(
            token,
            publicKey,
            { algorithms: ["RS256"] },
        );
        
        if(verified) {
            return NextResponse.json({
                verified: true,
            }, {status: 200});
        }

    } catch (error: any) {
        console.error("Invalid or Unavailable Token", error as Error);
        if (error && error.name === "JsonWebTokenError") {
            return{
                verified: false,
                error: error.message,
            };
        }
    }
}
