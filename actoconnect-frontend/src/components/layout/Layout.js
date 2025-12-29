import React from 'react';
import Navbar from './Navbar';
import ActyAvatar from '../ui/ActyAvatar';

const Layout = ({ children }) => {
  return (
    <div className="layout pattern-bg">
      <Navbar />
      <main>{children}</main>
      <ActyAvatar />
    </div>
  );
};

export default Layout;