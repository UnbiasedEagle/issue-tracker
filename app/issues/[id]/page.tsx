import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (Number.isNaN(Number(id))) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid
      gap='5'
      columns={{
        initial: '1',
        md: '2',
      }}
    >
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex my='2' gap='3'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt='4'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link
            className='flex items-center space-x-2'
            href={`/issues/${issue.id}/edit`}
          >
            <Pencil2Icon />
            <span>Edit Issue</span>
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
