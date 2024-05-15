'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FiArrowLeft, FiEdit2, FiTrash } from 'react-icons/fi';
import { Button, Input } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { updateProject } from '@/lib/actions/update-project';
import { deleteProject } from '@/lib/actions/delete-project';

const schema = yup.object().shape({
  name: yup.string().required('Project name is required'),
});

const UpdateProjectBar = ({ project }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project.name,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false); // State to manage delete loading state

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    reset({ name: project.name }); // Reset form to default values when toggling editing mode
  };

  const onSubmit = async (data) => {
    try {
      await updateProject(project.id, { ...data });
      toast.success('Project has been updated');
      setIsEditing(false); // Exit editing mode after successful update
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.error('Failed to update project');
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true); // Set deleting state to true
      await deleteProject(project.id);
      toast.success('Project deleted successfully');
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    } finally {
      setDeleting(false); // Reset deleting state regardless of success or failure
    }
  };

  return (
    <nav className='w-full'>
      <div className='flex items-center justify-between'>
        <Link className='flex items-center gap-2' href='/dashboard'>
          <FiArrowLeft className='h-4 w-4' /> Back
        </Link>
        <div className='flex items-center'>
          {isEditing ? (
            <form
            className='flex'
            onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter project name..."
                    error={errors.name?.message}
                  />
                )}
              />
              <Button type="submit" disabled={false}>
                Update
              </Button>
              <Button variant='light' onClick={toggleEdit}>
                Cancel
              </Button>
            </form>
          ) : (
            <>
              {project.name}
              <Button variant='light' onClick={toggleEdit}>
                <FiEdit2 className='h-4 w-4 mr-4 text-yellow-900' />
              </Button>
            </>
          )}
        </div>
        <Button variant='light' onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : <FiTrash />}
        </Button>
      </div>
    </nav>
  );
};

export default UpdateProjectBar;
