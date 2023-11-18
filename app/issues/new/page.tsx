'use client';

import { Button, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    await axios.post('/api/issues', data);
    router.push('/issues');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl space-y-3'>
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
  );
};

export default NewIssuePage;
