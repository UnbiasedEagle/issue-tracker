'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex gap='3' align='center'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <ul className='flex items-center space-x-6'>
              {links.map((link) => {
                return (
                  <li key={link.href}>
                    <Link
                      className={classnames({
                        'text-zinc-900': currentPath === link.href,
                        'text-zinc-500': currentPath !== link.href,
                        'hover:text-zinc-800 transition-colors': true,
                      })}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href='/api/auth/signout'>Log out</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
