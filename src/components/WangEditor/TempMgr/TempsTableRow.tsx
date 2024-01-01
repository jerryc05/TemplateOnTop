import { Template } from '@/_generated/typescript-fetch'
import { TableCell, TableRow } from '@/shadcnui/ui/table'
import React from 'react'

export const TempsTableRow = React.memo(
  ({
    temp,
    lastModified,
    created,
  }: {
    temp: Template
    lastModified: string
    created: string
  }) => (
    <TableRow key={temp.id}>
      <TableCell className='px-1 w-6 font-medium'>{temp.id}</TableCell>
      <TableCell className='px-1 max-w-36 overflow-hidden overflow-ellipsis'>
        {temp.title}
      </TableCell>
      <TableCell className='px-1 pr-3 max-w-48 overflow-hidden overflow-ellipsis'>
        {temp.html}
      </TableCell>
      <TableCell className='px-1'>{lastModified}</TableCell>
      <TableCell className='px-1'>{created}</TableCell>
    </TableRow>
  )
)

TempsTableRow.displayName = 'TempsTableRow'
