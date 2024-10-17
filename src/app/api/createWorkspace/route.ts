import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const {workspaceName, workspaceDescription} =  await req.json();
    const userId = req.headers.get('tm-user-id');
    

    if(!userId || !workspaceName) {
        return NextResponse.json({warning: 'Workspace name is required'}, {status: 400});
    }

    try {
        const newWorkspace = await prisma.workspace.create({
            data: {
                name: workspaceName,
                description: workspaceDescription,
                userId: userId,
            }
        })
        if(newWorkspace) {
            return NextResponse.json({
                success: true,
                message: 'Workspace created successfully',
            }, {status: 201});
        }
    } catch (error) {
        console.error('An error occurred. Please try again later:', error)
        return NextResponse.json({error: 'An error occurred. Please try again later', success: false}, {status: 500});
    }
}