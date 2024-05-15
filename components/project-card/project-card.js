'use client'
import Link from 'next/link';
import React from 'react';

const ProjectCard = ({ project }) => {
  const linkStyle = {
    padding: '1rem',
    borderLeft: `4px solid ${project.color}`, // Set the border color dynamically
    transition: 'all 0.3s', // Apply transition effect
    position: 'relative', // Position relative for absolute positioning of the color bar
    display: 'flex', // Flex display to align items vertically
    alignItems: 'center', // Center align items vertically
    textDecoration: 'none', // Remove underline from link
    color: 'inherit', // Inherit text color
  };

  const colorBarStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%', // Full height of the link
    width: '6px', // Width of the color bar
    backgroundColor: project.color, // Set background color dynamically
    transition: 'all 0.3s', // Apply transition effect
  };

  return (
    <Link
    className='border hover:shadow-md'
    href={`/dashboard/project/${project.id}`} style={linkStyle}>
      <div 
      style={colorBarStyle} />
      <div className='flex w-full'>
        <div className='flex justify-between items-center w-full'>
            <span>{project.name}</span>
            <span className='flex flex-col items-center'>
            {project.tasks.length}
            <span className='text-xs font-light'>Total Task</span>
          </span>
          </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
