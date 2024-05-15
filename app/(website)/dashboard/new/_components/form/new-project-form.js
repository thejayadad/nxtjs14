'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Textarea, Button } from '@nextui-org/react';
import { createProject } from '@/lib/actions/create-project';
import ColorPicker from '../color/color-picker';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().required('Project name is required'),
});

const NewProjectform = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState('');
  const [priority, setPriority] = React.useState('');

  const onSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handlePriority = (value) => {
    setPriority(value);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createProject({ ...data, color: selectedColor, priority }); // Include selected priority in project data
      toast.success('Project created successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <section className='p-6'>
      <div>
        <form className='max-w-screen-md mx-auto' onSubmit={handleSubmit(onSubmit)}>
          <span>What Is The Name Of Your Project?</span>
          <Input
            className='pt-2'
            placeholder='Name...'
            {...register('name')}
          />
          {errors.name && <p>{errors.name.message}</p>}
            <div className='pt-8'>
            <span className='mb-4'>Select A Color To Organize Your Project</span>
            <div className='bg-slate-100 p-2 shadow-sm border rounded-lg'>
              <ColorPicker onSelectColor={onSelectColor} /> {/* Pass onSelectColor function */}
            </div>
            <div className='pt-8 pb-8'>
              <span className='mb-4'>Select Project Priority</span>
              <div className="flex space-x-4">
                <Button 
                className='w-full'
                ghost color='primary' onClick={() => handlePriority('low')}>Low</Button>
                <Button 
                 className='w-full'
                ghost color='success' onClick={() => handlePriority('medium')}>Medium</Button>
                <Button 
                 className='w-full'
                ghost color='warning' onClick={() => handlePriority('high')}>High</Button>
              </div>
            </div>
            <div className='pt-8 pb-8'>
              <span className='mb-4'>Add Some Project Specific Notes</span>
              <Textarea
                placeholder='Notes...'
                {...register('notes')}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 w-full" loading={loading}>
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
        </form>
        <Toaster />
      </div>
    </section>
  );
};

export default NewProjectform;
