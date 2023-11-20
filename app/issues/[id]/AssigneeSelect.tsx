'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

  const handleAssigneeChange = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === 'unassigned' ? null : userId,
      });
    } catch (error) {
      toast.error('Changes could not be saved');
    }
  };

  if (error) return null;

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={(userId) => handleAssigneeChange(userId)}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='unassigned'>Unassigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
