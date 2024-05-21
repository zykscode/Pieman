import { RxAvatar, RxDashboard } from "react-icons/rx";
import { MarketingConfig } from "../types";
import { GrTransaction } from 'react-icons/gr';
import { RiSettings5Fill } from 'react-icons/ri';


export const marketingConfig: MarketingConfig = {
  mainNav: [
    { href:'dashboard', title: 'dashboard', icon: RxDashboard },
    { href:'deals', title: 'deals', icon: GrTransaction },
    {  href:'settings',title: 'settings', icon: RiSettings5Fill },
    {  href:'profile', title: 'profile', icon: RxAvatar },
  ],
}
