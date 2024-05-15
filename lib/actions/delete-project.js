'use server'

import prisma from "../prisma";


export const deleteProject = async (id) => {
    try {
        console.log("Deleting topic with ID:", id);
        const deletedProject = await prisma.project.delete({
            where: { id },
        });
        console.log("Topic deleted:", deletedProject);
        return deletedProject;
    } catch (error) {
        console.error("Error deleting topic:", error);
        throw new Error('Failed to delete topic');
    }
};
