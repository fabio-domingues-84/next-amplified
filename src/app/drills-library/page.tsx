import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

import { fetchDrills } from './actions/drills';

export default async function Drills() {
  const { data, errors } = await fetchDrills();
  const drills = data.listDrills.items;

  return (
    <div className=" px-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Goal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drills.map((drill) => (
            <TableRow key={drill.id}>
              <TableCell className="font-light text-blue-500 hover:underline"><Link href={`/drills-library/${drill.id}`}>{drill.id}</Link></TableCell>
              <TableCell className="font-light">{drill.description}</TableCell>
              <TableCell className="font-light">{drill.goal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}