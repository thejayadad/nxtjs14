import { auth } from '@/auth';
import ProjectCard from '@/components/project-card/project-card';
import prisma from '@/lib/prisma';
import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import React, { Suspense } from 'react'

const DashboardPage = async () => {
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;
  return (
    <section className='pt-12 px-4 space-y-4'>
        <Suspense fallback={<WelcomeMsgFallback />}>
            <WelcomeMsg />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
        <ProjectList />
        </Suspense>
    </section>
  )
}

async function WelcomeMsg(){
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;
    if(!user){
        return <div>Error</div>
    }
    return (
        <div className="flex w-full">
          <h2 className='text-2xl font-extrabold'>Hi {userEmail}</h2>

        </div>
    )
}

function WelcomeMsgFallback(){
    return (
        <div className="flex w-full">
         <h2 className='text-2xl font-extrabold'>
         <Skeleton className="w-[180px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
         </h2>

        </div>
    )
}



async function ProjectList(){
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;

    // Fetch projects created by the logged-in user
    const projects = await prisma.project.findMany({
        where: {
            createdById: userEmail
        },
        include: {
            tasks: true
        }
    });
    if(projects.length === 0){
        return (
            <div className='flex flex-col pt-24 items-center justify-center gap-5'>
                No Projects Listed
            </div>
        )
    }
    return (
        <>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map(project => (
                <ProjectCard
                key={project.id}
                project={project}
                />
            ))}
        </div>
        </>
    )
}

export default DashboardPage