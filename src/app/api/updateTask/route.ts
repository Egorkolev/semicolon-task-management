import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
    const {
        taskId, 
        taskName,
        taskDescription,
        taskPriority,
        taskStatus,
        taskStartDate,
        taskEndDate,
        workspaceId
    } =  await req.json();
    const userId = req.headers.get('tm-user-id');
    

    if(!userId || !taskName) {
        return NextResponse.json({warning: 'Task name is required'}, {status: 400});
    }

    try {
        const updateTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                title:       taskName,   
                description: taskDescription || "",
                priority:    taskPriority,  
                status:      taskStatus,  
                startDate:   taskStartDate,  
                dueDate:     taskEndDate || null, 
                workspace: {
                    connect:{id: workspaceId},
                }
            }
        })
        if(updateTask) {

            return NextResponse.json({
                success: true,
                message: 'Task updated successfully',
            }, {status: 201});
        }
    } catch (error) {
        console.error('An error occurred. Please try again later:', error)
        return NextResponse.json({error: 'An error occurred. Please try again later', success: false}, {status: 500});
    }
}