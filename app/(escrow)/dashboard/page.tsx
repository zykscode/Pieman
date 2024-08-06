import { currentUser } from '@clerk/nextjs/server';

export default async function Page() {
  const user = await currentUser();
  console.log(user, 'jere is the user');
  if (!user) return <div>Not signed in</div>;

  return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
