import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { fullName, email, password } = await req.json();

    if(!fullName || !email || !password) {
        return NextResponse.json({error: 'All fields are required'}, {status: 400});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: _, ...userWithoutPassword} = newUser;

        return NextResponse.json({
            message: 'User created saccessfully',
            success: true,
            user: userWithoutPassword,
        }, {status: 201});
    } catch (error) {
        console.error('Error to create new User', error)
        return NextResponse.json({error: 'Error to create new User', success: false}, {status: 500});
    } 
}