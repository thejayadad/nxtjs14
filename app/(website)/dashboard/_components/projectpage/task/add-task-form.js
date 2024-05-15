'use client'
// AddTaskForm.js (Client Side)
import { Input, Button } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { createTask } from '@/lib/actions/create-task';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  content: yup.string().required('Task content is required'),
});

const AddTaskForm = ({ projectId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await createTask({ ...data, projectId }); // Pass projectId along with form data
      toast.success('Task created successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task');
    }
  };

  return (
    <div>
      <h1 className='font-bold'>Add Task</h1>
      <form
     className='max-w-screen-sm mx-auto flex'
      onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('content')} // Use register instead of control
          placeholder='Task...'
          error={errors.content?.message}
        />
        <input type="hidden" name="projectId" value={projectId} ref={register()} /> {/* Use ref={register()} */}
        <Button type="submit" auto>
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddTaskForm;
