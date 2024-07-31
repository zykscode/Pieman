import { RxAvatar, RxDashboard } from "react-icons/rx";
import { MarketingConfig } from "../types";
import { GrTransaction } from 'react-icons/gr';
import { RiSettings5Fill,RiHome7Fill } from 'react-icons/ri';
import { IoWalletOutline } from "react-icons/io5";
import { TbExchange } from "react-icons/tb";


export const marketingConfig: MarketingConfig = {
  mainNav: [
    { href:'', title: 'home', icon: RiHome7Fill},
    { href:'transaction', title: 'transaction', icon: TbExchange },
    { href:'wallet', title: 'wallet', icon: IoWalletOutline },
    { href:'dashboard', title: 'profile', icon: RxAvatar  },
  ],
}
