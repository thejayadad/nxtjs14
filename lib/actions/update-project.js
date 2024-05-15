'use server'

import { auth } from "@/auth";
import prisma from "../prisma";

export async function updateProject(projectId, eventData) {
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;

    if (!user) {
        throw new Error('User not found');
    }
    
    try {
        // Fetch user by email to get the correct userId
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        
        if (!existingUser) {
            throw new Error('User not found');
        }

        const { name, color, notes, priority, dueDate } = eventData;

        // Update the project using prisma.project.update
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                name,
                color,
                notes,
                priority,
                dueDate,
                createdBy: { connect: { email: userEmail } }, // Correct format for createdBy field
            },
        });

        console.log("Project updated:", updatedProject);
        return updatedProject;
    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error('Error: ' + error.message);
    }
}
