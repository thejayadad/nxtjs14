    'use server'
    import { auth } from "@/auth";
    import prisma from "../prisma";
    
    export async function updateTask(taskId, eventData) {
        const session = await auth();
        const user = session?.user;
    
        if (!user) {
            throw new Error('User not found');
        }
    
        try {
            const { content, done } = eventData;
    
            const updatedTask = await prisma.task.update({
                where: { id: taskId },
                data: {
                    content,
                    done
                },
            });
    
            console.log("Task updated:", updatedTask);
            return updatedTask;
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error('Error updating task: ' + error.message);
        }
    }
    