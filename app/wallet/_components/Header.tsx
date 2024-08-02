/* eslint-disable react/button-has-type */
import React from 'react';

import { useUser } from '#/contexts/UserContext';

const Header: React.FC = () => {
  const { user, signIn, signOut } = useUser();

  return (
    <header>
      <h1>Shop</h1>
      {user ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </header>
  );
};

export default Header;
