import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const userId = req.headers.get('tm-user-id');
    
    if(!userId) {
        return NextResponse.json({warning: "User ID is required"}, {status: 400});
    }

    try {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        const mapUserData = {
            email: userData?.email,
            name: userData?.fullName,
            userImg: userData?.photoUrl,
        }

    return NextResponse.json({message: 'User is available', success: true, data: mapUserData}, {status: 200});
    } catch (error) {
        console.error("Error to check workspace", error);
        return NextResponse.json({error: "An error occurred. Please try again later", success: false}, {status: 500});
    }
}