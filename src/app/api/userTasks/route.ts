import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const userId = req.headers.get('tm-user-id');
    
    if(!userId) {
        return NextResponse.json({warning: "User ID is required"}, {status: 400});
    }

    try {
        const userTasks = await prisma.task.findMany({
            where: {
                workspace: {
                    user: {
                        id: userId,
                    }
                }
            },
        });

        if(userTasks.length === 0) {
            return NextResponse.json({warning: 'Please create your first Task', success: false, tasks: []}, {status: 200});
        }

        return NextResponse.json({message: 'Task created successfully', success: true, tasks: userTasks}, {status: 200});
    } catch (error) {
        console.error("Error to check task", error);
        return NextResponse.json({error: "An error occurred. Please try again later"}, {status: 500});
    }
}