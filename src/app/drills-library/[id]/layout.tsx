export default function DrillsLayout({
  drillNotes,
  children
}: Readonly<{
  drillNotes: React.ReactNode;
  addNotes: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}

      {drillNotes}      
    </>
  );
}