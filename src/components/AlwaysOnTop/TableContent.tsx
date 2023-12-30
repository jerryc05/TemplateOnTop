import { WindowInfo } from '@/_generated/typescript-fetch'
import { Button } from '@/shadcnui/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcnui/ui/table'
import React from 'react'

export function TableContent({
  setTop,
}: {
  setTop: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [info, setInfo] = React.useState<WindowInfo[] | null>(null)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>标题</TableHead>
          <TableHead>进程名</TableHead>
          <TableHead>进程路径</TableHead>
          <TableHead className='w-16 text-center'>置顶</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {info?.map(x => (
          <TableRow key={x.hwnd}>
            <TableCell className='font-medium'>{x.title}</TableCell>
            <TableCell>{x.nameOfPid}</TableCell>
            <TableCell>{x.exeOfPid}</TableCell>
            <TableCell>
              <Button
                variant={x.isTop ? 'default' : 'outline'}
                className='hover:scale-105 active:scale-100'
              >
                {x.isTop ? '已' : '未'}置顶
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    </Table>
  )
}
