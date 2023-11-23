import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import IssueChart from './IssueChart';
import { Flex, Grid } from '@radix-ui/themes';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

const HomePage = async () => {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  });

  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  });

  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED',
    },
  });

  return (
    <Grid
      gap='5'
      columns={{
        initial: '1',
        md: '2',
      }}
    >
      <Flex gap='5' direction='column'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export const metadata: Metadata = {
  title: 'Isse Tracker - Dashboard',
  description: 'View a summary of project issues',
};

export default HomePage;
