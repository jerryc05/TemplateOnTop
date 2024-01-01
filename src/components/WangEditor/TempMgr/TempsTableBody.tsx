import { Template, TemplateContent } from '@/_generated/typescript-fetch'
import { TableCell, TableRow } from '@/shadcnui/ui/table'
import React, { useEffect } from 'react'

export const TempsTableBody = React.memo(
  ({
    filteredTemps,
    onTempOpened,
    setIsDialogOpen,
  }: {
    filteredTemps: Template[] | null
    onTempOpened: (temp: TemplateContent) => void
    setIsDialogOpen: (isOpen: boolean) => void
  }) => {
    return filteredTemps?.map(temp => (
      <TableRow
        key={temp.id}
        className='cursor-pointer'
        onClick={() => {
          onTempOpened(temp)
          setIsDialogOpen(false)
        }}
      >
        <TableCell className='px-1 w-6 font-medium'>{temp.id}</TableCell>
        <TableCell className='px-1 max-w-36 overflow-hidden overflow-ellipsis'>
          {temp.title}
        </TableCell>
        <TableCell className='px-1 pr-3 max-w-48 overflow-hidden overflow-ellipsis'>
          {temp.html}
        </TableCell>
        <TableCell className='px-1'>
          <FormatDate timestamp={temp.lastModified} />
        </TableCell>
        <TableCell className='px-1'>
          <FormatDate timestamp={temp.created} />
        </TableCell>
      </TableRow>
    ))
  }
)

TempsTableBody.displayName = 'TempsTableBody'

function FormatDate({ timestamp }: Readonly<{ timestamp: number }>) {
  const [, forceUpdate] = React.useReducer(() => ({}), {})
  useEffect(() => {
    const interval = setInterval(forceUpdate, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const diff = Date.now() - timestamp * 1000

  const SECONDS = 1000,
    MINUTES = SECONDS * 60,
    HOURS = MINUTES * 60,
    DAYS = HOURS * 24

  if (diff < SECONDS) return <>刚刚</>
  if (diff < MINUTES)
    return (
      <>
        <span className={numberClass}>{Math.floor(diff / SECONDS)}</span>秒前
      </>
    )
  if (diff < HOURS)
    return (
      <>
        <span className={numberClass}>{Math.floor(diff / MINUTES)}</span>分钟
        <span className={numberClass}>
          {Math.floor((diff % MINUTES) / SECONDS)}
        </span>
        秒前
      </>
    )
  if (diff < DAYS)
    return (
      <HourMin
        hour={Math.floor(diff / HOURS)}
        min={Math.floor((diff % HOURS) / MINUTES)}
      />
    )

  const date = new Date(0)
  date.setUTCSeconds(timestamp)
  return date.toLocaleDateString()
}

const HourMin = React.memo(({ hour, min }: { hour: number; min: number }) => (
  <>
    <span className={numberClass}>{hour}</span>小时
    <span className={numberClass}>{min}</span>
    分钟前
  </>
))
HourMin.displayName = 'HourMin'

const numberClass = 'w-5 inline-flex justify-center'
