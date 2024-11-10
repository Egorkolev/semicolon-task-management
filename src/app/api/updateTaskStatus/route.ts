import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Status } from "@/constants";

export async function PATCH(req: Request) {
    const {status, id: taskId, workspaceId} =  await req.json();
    const userId = req.headers.get('tm-user-id');
    

    if(!userId || !status) {
        return NextResponse.json({warning: 'Task status is required'}, {status: 400});
    }

    try {
        const getReplaceStatus = () => {
            switch(status) {
                case Status.PENDING:
                    return Status.IN_PROGRESS;
                case Status.IN_PROGRESS:
                    return Status.COMPLETE;
            }
        }


        const updateTask = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                status: getReplaceStatus(),
                workspace: {
                    connect: {id: workspaceId},
                }
            },
        })
        if(updateTask) {
            return NextResponse.json({
                success: true,
                message: 'Task status updated successfully',
                status: updateTask.status,
            }, {status: 201});
        }
    } catch (error) {
        console.error('An error occurred. Please try again later:', error)
        return NextResponse.json({error: 'An error occurred. Please try again later', success: false}, {status: 500});
    }
}