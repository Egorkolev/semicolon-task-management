import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { apiKeys } from "@/lib/apiKeys";

export async function POST(req: Request) {
    const { token } = await req.json()
    try {
        const publicKey = apiKeys.RSA_PUBLIC_KEY_PEM;
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
            return NextResponse.json({
                verified: false,
                error: error.message,
            }, {status: 401});
        }
    }
}
