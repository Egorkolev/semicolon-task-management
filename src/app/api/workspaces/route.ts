import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const userId = req.headers.get('tm-user-id');
    
    if(!userId) {
        return NextResponse.json({warning: "User ID is required"}, {status: 400});
    }

    try {
        const userWorkspaces = await prisma.workspace.findMany({
            where: {
                userId: userId,
            },
        });

        if(userWorkspaces.length === 0) {
            return NextResponse.json({warning: 'Please create your first Workspace', success: false, workspaces: []}, {status: 200});
        }

        return NextResponse.json({message: 'Workspace created successfully', success: true, workspaces: userWorkspaces}, {status: 200});
    } catch (error) {
        console.error("Error to check workspace", error);
        return NextResponse.json({error: "An error occurred. Please try again later"}, {status: 500});
    }
}