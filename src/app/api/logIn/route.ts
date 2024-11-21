import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { apiKeys } from "@/lib/apiKeys";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const privateKey = apiKeys.RSA_PRIVATE_KEY_PEM.replace(/\\n/g, '\n');
    
    if(!email || !password) {
        return NextResponse.json({error: 'All fields are required'}, {status: 400});
    };

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if(!user) {
            return NextResponse.json({
                warning: 'Please check your login details and try again',
                success: false,
            }, {status: 401});
        };
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) {
            return NextResponse.json({
                warning: 'Please check your login details and try again',
                success: false,
            }, {status: 401});
        };

        const accessToken = jwt.sign(
            {name: user.fullName, userId: user.id, email: user.email },
            privateKey,
            {algorithm: 'RS256', expiresIn: '1h'}
        );
        const refreshToken = jwt.sign(
            {name: user.fullName, userId: user.id, email: user.email},
            privateKey,
            {algorithm: 'RS256', expiresIn: '7d'}
        );

        return NextResponse.json({
            message: 'You have successfully logged in', 
            success: true,
            accessToken, 
            refreshToken,
            userId: user.id,
        }, {status: 200});
    } catch (error) {
        console.error('An error occurred. Please try again later:', error);
        return NextResponse.json({error: 'An error occurred. Please try again later'}, {status: 500});
    };
}