export default function Layout({
  children,
  notes
}: Readonly<{
  children: React.ReactNode;
  notes: React.ReactNode;
}>) {
  return (
    <>
      {children}

      {notes}
    </>
  );
}