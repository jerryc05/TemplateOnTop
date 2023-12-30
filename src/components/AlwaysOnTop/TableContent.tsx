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
      title: 'test',
      is_top: 1,
      name_of_pid: 'test',
      exe_of_pid: '/test/test/test',
    },
  ])
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>标题</TableHead>
          <TableHead>已置顶</TableHead>
          <TableHead>进程名</TableHead>
          <TableHead>进程路径</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {info.map(x => (
          <TableRow key={x.hwnd}>
            <TableCell className='font-medium'>{x.title}</TableCell>
            <TableCell>{x.is_top}</TableCell>
            <TableCell>{x.name_of_pid}</TableCell>
            <TableCell>{x.exe_of_pid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    </Table>
  )
}
