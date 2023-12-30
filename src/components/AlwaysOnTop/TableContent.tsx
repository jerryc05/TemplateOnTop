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

type WindowInfo = {
  hwnd: number
  title: string
  is_top: number
  name_of_pid?: string
  exe_of_pid?: string
}

export function TableContent({
  setTop,
}: {
  setTop: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [info, setInfo] = React.useState<WindowInfo[]>([
    {
      hwnd: 0,
      title: 'test',
      is_top: 8,
      name_of_pid: 'test',
      exe_of_pid: '/test/test/test',
    },
  ])
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
        {info.map(x => (
          <TableRow key={x.hwnd}>
            <TableCell className='font-medium'>{x.title}</TableCell>
            <TableCell>{x.name_of_pid}</TableCell>
            <TableCell>{x.exe_of_pid}</TableCell>
            <TableCell>
              <Button
                variant={x.is_top ? 'default' : 'outline'}
                className='hover:scale-105 active:scale-100'
              >
                {x.is_top ? '已' : '未'}置顶
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
