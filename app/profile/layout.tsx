import type { ReactNode } from 'react';
import React from 'react';

type Props = { children: ReactNode };

const WalletLayout = ({ children }: Props) => {
  return (
    <div className="flex h-full flex-col justify-center bg-green-300">
      {children}
    </div>
  );
};

export default WalletLayout;
