'use server'
import { auth } from "@/auth";
import prisma from "../prisma";

export async function createProject(eventData) {
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;

    if (!user) {
        throw new Error('User not found');
    }
    try {
        const { name, color, notes, priority } = eventData;
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const newProject = await prisma.project.create({
            data: {
                name,
                color,
                notes,
                priority,
                createdBy: { connect: { email: userEmail } }, // Correct format for createdBy field
            },
        });
        return newProject;
    } catch (error) {
        console.log("Create Project Error: " + error);
        throw new Error('Failed to create project.');
    }
}
