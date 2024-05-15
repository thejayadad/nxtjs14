'use client'
import { deleteTopic } from '@/lib/actions/delete-task';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiTrash } from 'react-icons/fi';

const TaskList = ({ project, onUpdateTask, onDeleteTask }) => {
    const [deleting, setDeleting] = useState(false);

    const handleDeleteClick = async (taskId) => {
        try {
            setDeleting(true);
            await deleteTopic(taskId);
            toast.success('Task deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task');
            setDeleting(false);
        }
    };

    const handleTaskClick = async (taskId, content, done) => {
        try {
            await onUpdateTask(taskId, { content, done });
            toast.success('Project has been updated');
            window.location.reload();
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update project');
        }
    };

    return (
        <div>
            {project?.tasks && project.tasks.length > 0 ? (
                <ul className='pt-4'>
                    {project.tasks.map((task, index) => (
                        <li 
                        className='flex justify-between items-center max-w-screen-sm mx-auto'
                        key={index}>
                            {/* Checkbox to mark the task as done */}
                            <div>
                            <input
                                className='mr-1'
                                type="checkbox"
                                checked={task.done} // Set checked status based on task.done value
                                onChange={() => handleTaskClick(task.id, task.content, !task.done)}
                            />
                            {/* Apply strikethrough style if task is done and render a check mark */}
                            <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                                {task.content}
                            </span>
                            {task.done && (
                                <span role="img" aria-label="check-mark" style={{ marginLeft: '5px' }}>
                                    ✅
                                </span>
                            )}
                            </div>
                            {/* Trash icon for deleting tasks */}
                            <FiTrash
                                className='ml-2 cursor-pointer'
                                onClick={() => handleDeleteClick(task.id)}
                                size={18}
                                color={deleting ? '#999' : '#000'}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='pt-4'>No tasks available for this project.</p>
            )}
            <Toaster />
        </div>
    );
};

export default TaskList;
