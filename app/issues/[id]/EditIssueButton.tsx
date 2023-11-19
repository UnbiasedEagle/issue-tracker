import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button>
      <Link href={`/issues/${issueId}/edit`}>
        <Flex align='center' gap='2'>
          <Pencil2Icon />
          <span>Edit Issue</span>
        </Flex>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
