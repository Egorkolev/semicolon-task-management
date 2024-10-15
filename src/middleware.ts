import { NextRequest, NextResponse } from "next/server";
import { importSPKI, jwtVerify } from "jose";
import { apiKeys } from "./lib/apiKeys";

const privateKey = apiKeys.RSA_PUBLIC_KEY_PEM;

async function getPublicKey() {
    return await importSPKI(privateKey, 'RS256');
}

export async function middleware(req: NextRequest){
    
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token) {
        try {
            const publicKey = await getPublicKey();
            const { payload } = await jwtVerify(token, publicKey);
            const response = NextResponse.next();
            response.headers.set('tm-user-id', payload.userId as string);
            return response;
    
        } catch (error) {
            console.error('Token verification failed', error);
        }
    }
}