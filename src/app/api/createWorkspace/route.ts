import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const {workspaceName, workspaceDescription} =  await req.json();
    const userId = req.headers.get('tm-user-id');
    

    if(!userId || !workspaceName) {
        return NextResponse.json({error: 'user ID and workspace Name is required'}, {status: 400});
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
                message: 'Workspac created saccessfully',
            }, {status: 201});
        }
    } catch (error) {
        console.error('Error to create new Workspac', error)
        return NextResponse.json({error: 'Error to create new Workspac', success: false}, {status: 500});
    }
}