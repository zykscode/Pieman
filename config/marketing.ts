import { IoWalletOutline } from 'react-icons/io5';
import { RiHome7Fill } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import { TbExchange } from 'react-icons/tb';

import type { MarketingConfig } from '../types';

export const marketingConfig: MarketingConfig = {
  mainNav: [
    { href: '', title: 'home', icon: RiHome7Fill },
    { href: 'transaction', title: 'transaction', icon: TbExchange },
    { href: 'wallet', title: 'wallet', icon: IoWalletOutline },
    { href: 'dashboard', title: 'profile', icon: RxAvatar },
  ],
};
