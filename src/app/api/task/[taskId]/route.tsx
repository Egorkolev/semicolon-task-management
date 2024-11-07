import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, {params}: {params: {taskId: string}}) {
    const {taskId} = params;
    const userId = req.headers.get('tm-user-id');
    console.log("taskId from back", taskId);
    
    
    if(!userId) {
        return NextResponse.json({warning: "User ID is required"}, {status: 400});
    }

    try {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                workspace: {
                    user: {
                        id: userId,
                    }
                }
            },
        });

        if (!task) {
            return NextResponse.json({ warning: "Task not found or does not belong to this workspace", success: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Task retrieved successfully", success: true, task: task }, { status: 200 });
    } catch (error) {
        console.error("Error to check task", error);
        return NextResponse.json({error: "An error occurred. Please try again later"}, {status: 500});
    }
}