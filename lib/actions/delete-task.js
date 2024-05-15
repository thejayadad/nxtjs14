'use server'

import prisma from "../prisma";


export const deleteTopic = async (id) => {
    try {
        console.log("Deleting topic with ID:", id);
        const deletedTopic = await prisma.task.delete({
            where: { id },
        });
        console.log("Topic deleted:", deletedTopic);
        return deletedTopic;
    } catch (error) {
        console.error("Error deleting topic:", error);
        throw new Error('Failed to delete topic');
    }
};
