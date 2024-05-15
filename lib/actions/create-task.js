'use server'
// create-task.js (Server Side)
import { auth } from "@/auth";
import prisma from "../prisma";

export async function createTask(eventData) {
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;

    if (!user) {
        throw new Error('User not found');
    }
    try {
        const { content, projectId } = eventData;
        // Check if the user has access to the project before creating a task
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });
        if (!project) {
            throw new Error('Project not found');
        }
        const newTask = await prisma.task.create({
            data: {
                content,
                project: {
                    connect: {
                        id: projectId,
                    },
                },
            },
        });
        return newTask;
    } catch (error) {
        console.error("Create Task Error: " + error);
        throw new Error('Failed to create task.');
    }
}
