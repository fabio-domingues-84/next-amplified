'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { useDrillsViewModel } from '@/app/drills-library/view-model/view-model'

export function DrillsTable() {
  const drills = useDrillsViewModel((s) => s.drills)

  return (
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
            <TableCell className="font-light text-blue-500 hover:underline">
              <Link href={`/drills-library/${drill.id}`}>{drill.id}</Link>
            </TableCell>
            <TableCell className="font-light">{drill.description}</TableCell>
            <TableCell className="font-light">{drill.goal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}