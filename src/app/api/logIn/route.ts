import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

export async function POST(req: Request) {
    const {email, password} = await req.json();
    const privateKey = fs.readFileSync('private.pem', 'utf8');
    
    if(!email || !password) {
        return NextResponse.json({error: 'All fields are required'}, {status: 400})
    };

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if(!user) {
            return NextResponse.json({
                error: 'Incorect email or password',
                success: false,
            }, {status: 401});
        };
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) {
            return NextResponse.json({
                error: 'Incorect email or password',
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
            message: 'Login successfully access', 
            success: true,
            accessToken, 
            refreshToken,
        }, {status: 200});
    } catch (error) {
        console.error('Autentification error:', error);
        return NextResponse.json({error: 'Server error'}, {status: 500});
    };
}