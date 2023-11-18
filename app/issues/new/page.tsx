'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState('');

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  console.log(errors);

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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
          control={control}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
