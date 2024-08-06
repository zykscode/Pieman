import { ClerkProvider } from '@clerk/nextjs';

type Props = { children: React.ReactNode };

function PlatformLayout({ children }: Props) {
  return (
    <ClerkProvider>
      <div className="flex justify-center">{children} </div>
    </ClerkProvider>
  );
}

export default PlatformLayout;
