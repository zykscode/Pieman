import type { ReactNode } from 'react';
import React from 'react';

interface WalletLayoutProps {
  children: ReactNode;
}

const WalletLayout: React.FC<WalletLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full flex-col justify-center bg-green-300">
      {children}
    </div>
  );
};

export default WalletLayout;
