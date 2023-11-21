'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  {
    label: 'All',
  },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  const handleStatusChange = (status: string) => {
    const query = status !== 'all' ? `?status=${status}` : '';
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root onValueChange={handleStatusChange}>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => {
          return (
            <Select.Item key={status.value} value={status.value || 'all'}>
              {status.label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
