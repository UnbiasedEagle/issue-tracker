import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink passHref legacyBehavior href={href}>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
