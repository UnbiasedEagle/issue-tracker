import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <nav className='flex items-center space-x-6 border-b mb-5 px-5 h-14'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex items-center space-x-6'>
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link
                className='text-zinc-500 hover:text-zinc-800 transition-colors'
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
