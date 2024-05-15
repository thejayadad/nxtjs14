'use client'
// UpdateProjectItem.js
import { Input, Textarea, Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProject } from '@/lib/actions/update-project';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ColorPicker from '../../new/_components/color/color-picker';

const schema = yup.object().shape({
  name: yup.string().required('Project name is required'),
  notes: yup.string(),
});

const UpdateProjectItem = ({ project }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project.name,
      notes: project.notes || '', // Set default value for notes
    },
  });

  const [selectedColor, setSelectedColor] = useState(project.color); // State for selected color
  const [selectedPriority, setSelectedPriority] = useState(project.priority); // State for selected priority
  const [updating, setUpdating] = useState(false); // State for updating status
  const router = useRouter();

  useEffect(() => {
    setSelectedPriority(project.priority);
  }, [project.priority]);

  const onSelectColor = (color) => {
    setSelectedColor(color); // Update selected color
  };

  const handlePriority = (priority) => {
    setSelectedPriority(priority); // Update selected priority
  };

  const onSubmit = async (data) => {
    try {
      setUpdating(true); // Set updating status to true
      await updateProject(project.id, { ...data, priority: selectedPriority, color: selectedColor }); // Pass priority and selected color to updateProject function
      toast.success('Project has been updated');
      router.push('/dashboard'); // Redirect to dashboard after successful update
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.error('Failed to update project');
    } finally {
      setUpdating(false); // Set updating status back to false
    }
  };

  return (
    <div className='flex flex-col gap-8 p-2'>
      <h2 className='font-bold'>Update Your Project</h2>
      <div>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
          <Textarea control={control} name="notes" defaultValue={project.notes} error={errors.notes?.message} />
          <ColorPicker defaultValue={selectedColor} onSelectColor={onSelectColor} /> {/* Pass defaultValue and onSelectColor */}
          <div className='pt-8 pb-8'>
            <span className='mb-4'>Select Project Priority</span>
            <div className="flex space-x-4">
              <Button 
                className={`w-full ${selectedPriority === 'low' ? 'bg-primary text-white' : 'bg-light'} ${updating ? 'disabled' : ''}`}
                onClick={() => handlePriority('low')} disabled={updating}>
                Low
              </Button>
              <Button 
                className={`w-full ${selectedPriority === 'medium' ? 'bg-success text-white' : 'bg-light'} ${updating ? 'disabled' : ''}`}
                onClick={() => handlePriority('medium')} disabled={updating}>
                Medium
              </Button>
              <Button 
                className={`w-full ${selectedPriority === 'high' ? 'bg-warning text-white' : 'bg-light'} ${updating ? 'disabled' : ''}`}
                onClick={() => handlePriority('high')} disabled={updating}>
                High
              </Button>
            </div>

          </div>
          
          <Button
            color='primary'
            type="submit" auto disabled={updating}>
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default UpdateProjectItem;
