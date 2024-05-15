import React from 'react'
import UpdateProjectBar from '../../_components/projectpage/update-project-bar'
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import UpdateProjectIitem from '../../_components/projectpage/update-project-items';
import AddTaskForm from '../../_components/projectpage/task/add-task-form';
import TaskList from '../../_components/projectpage/task/task-list';
import { updateTask } from '@/lib/actions/update-task';

const ProjectPage = async ({params}) => {
    const postId = params.id; // Extract postId from params
    const session = await auth();
    const user = session?.user;
    const project = await prisma.project.findUnique({
        where: {
            id: postId
        },
        include: {
            tasks: true
        }

    })
    if(!project){
        return redirect("/dashboard")

    }
  return (
    <section className='pt-12 px-4 space-y-4'>
        <div>
            <div className='flex justify-between items-center'>
                <UpdateProjectBar
                project={project}
                />
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className=''>
                        <UpdateProjectIitem
                        project={project}
                        />
                    </div>
                    <div className=''>
                        <div className='flex flex-col'>
                            <AddTaskForm
                            projectId={project.id}
                            />
                                <TaskList project={project} onUpdateTask={updateTask} /> {/* Pass project */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}


export default ProjectPage