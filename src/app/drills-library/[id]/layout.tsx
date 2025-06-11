export default function DrillsLayout({
  drillNotes,
  addNotes,
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

      {addNotes}
    </>
  );
}