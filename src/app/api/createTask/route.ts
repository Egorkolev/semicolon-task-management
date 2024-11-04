import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const {            
        taskName,
        taskDescription,
        taskPriority,
        taskStatus,
        taskStartDate,
        taskEndDate
    } =  await req.json();
    const userId = req.headers.get('tm-user-id');
    

    if(!userId || !taskName) {
        return NextResponse.json({warning: 'Task name is required'}, {status: 400});
    }

    try {
        const workspace = await prisma.workspace.findFirst({
            where: {
                userId: userId,
            }
        })


        if (!workspace) {
            return NextResponse.json({ warning: 'Workspace not found for the user' }, { status: 404 });
        }

        const newTask = await prisma.task.create({
            data: {
                title:       taskName,   
                description: taskDescription || "",
                priority:    taskPriority,  
                status:      taskStatus,  
                startDate:   taskStartDate,  
                dueDate:     taskEndDate || null, 
                workspace: {
                    connect:{id: workspace.id},
                }
            }
        })
        if(newTask) {

            return NextResponse.json({
                success: true,
                message: 'Task created successfully',
                taskId: newTask.id,
                workspaceId: newTask.workspaceId
            }, {status: 201});
        }
    } catch (error) {
        console.error('An error occurred. Please try again later:', error)
        return NextResponse.json({error: 'An error occurred. Please try again later', success: false}, {status: 500});
    }
}