type Props = { children: React.ReactNode };

function PlatformLayout({ children }: Props) {
  return <div className="flex justify-center">{children}</div>;
}

export default PlatformLayout;
