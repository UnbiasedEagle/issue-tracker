'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occured.');
    }
  };

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root className='mb-5' color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <TextField.Root>
          <TextField.Input
            {...register('title')}
            placeholder='Title'
          ></TextField.Input>
        </TextField.Root>
        <Controller
          name='description'
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
          control={control}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
