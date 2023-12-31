import {
  DefaultApi,
  ResponseError,
  WindowInfo,
} from '@/_generated/typescript-fetch'
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
import { Loader2 } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'
import { ProcessTableRoTopBtn } from './ProcessTableRowTopBtn'

export function TableContent() {
  const [info, setInfo] = React.useState<
    (WindowInfo & { suggested?: boolean })[] | string | null
  >(null)

  const refresh = useCallback(() => {
    console.log('refresh!')
    const uniqueId = ` - ${Date.now()}`
    document.title += uniqueId
    new DefaultApi()
      .visibleWindowsWindowsPost()
      .then(list_ => {
        const list: (WindowInfo & { suggested?: boolean })[] = list_
        list.forEach((window, idx) => {
          if (window.title.includes(uniqueId)) {
            list[idx].suggested = true
            list.unshift(list.splice(idx, 1)[0])
          }
        })
        setInfo(list)
      })
      .catch(e => {
        if (!(e instanceof ResponseError)) return
        console.error(e)
        console.dir(e)
        if (e instanceof ResponseError && e.response.status === 400) {
          e.response
            .json()
            .then((x: { detail: string }) => {
              setInfo(x.detail)
            })
            .catch(console.error)
        } else {
          // todo toast
          alert(e.message)
        }
      })
      .finally(() => {
        document.title = document.title.replace(uniqueId, '')
      })
  }, [setInfo])

  useEffect(() => {
    refresh()
  }, [refresh])

  if (!info)
    return (
      <div className='mt-4 flex justify-center'>
        <Loader2 className='animate-spin' size='40' />
      </div>
    )

  if (typeof info === 'string') return <div>{info}</div>

  const processTableCellPadding = 'p-2 py-1'

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={processTableCellPadding}>标题</TableHead>
          <TableHead className={processTableCellPadding}>进程名</TableHead>
          <TableHead className={processTableCellPadding}>进程路径</TableHead>
          <TableHead className={`${processTableCellPadding} w-16 text-center`}>
            置顶
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {info.map(win => (
          <TableRow key={win.hwnd}>
            <TableCell
              className={`${processTableCellPadding} font-medium ${
                win.suggested ? 'font-bold' : ''
              }`}
            >
              {win.title}
            </TableCell>
            <TableCell className={processTableCellPadding}>
              {win.nameOfPid}
            </TableCell>
            <TableCell className={processTableCellPadding}>
              {win.exeOfPid}
            </TableCell>
            <TableCell className={processTableCellPadding}>
              <ProcessTableRoTopBtn win={win} refresh={refresh} />
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
      <Button
        variant='outline'
        className='mt-2'
        onClick={() => {
          setInfo(null)
          refresh()
        }}
      >
        刷新
      </Button>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    </Table>
  )
}
