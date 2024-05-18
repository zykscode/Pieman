'use client'

import { UserButton } from "@clerk/nextjs";

export default async function Page() {


  return(<div>
protected pagae
<UserButton afterSignOutUrl="/" />
  </div>)
}