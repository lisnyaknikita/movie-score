import { FC } from 'react';

import Logo from './Logo';

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar: FC<NavBarProps> = ({ children }) => {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;
