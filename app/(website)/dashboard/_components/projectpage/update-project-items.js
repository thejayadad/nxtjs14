'use client'
// UpdateProjectItem.js
import { Input, Textarea, Button } from '@nextui-org/react';
import React, { useState } from 'react';
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
  const [updating, setUpdating] = useState(false); // State for updating status
  const router = useRouter();

  const onSelectColor = (color) => {
    setSelectedColor(color); // Update selected color
  };

  const onSubmit = async (data) => {
    try {
      setUpdating(true); // Set updating status to true
      await updateProject(project.id, { ...data, color: selectedColor }); // Pass selected color to updateProject function
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
          <Button
          color='primary'
          type="submit" auto disabled={updating}> {/* Disable button when updating */}
            {updating ? 'Updating...' : 'Update'} {/* Show "Updating..." or "Update" based on updating status */}
          </Button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default UpdateProjectItem;
