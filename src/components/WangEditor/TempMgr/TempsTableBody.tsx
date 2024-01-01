import { Template } from '@/_generated/typescript-fetch'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcnui/ui/table'
import React, { useEffect } from 'react'
import { TempsTableRow } from './TempsTableRow'

function formatDate(now: number, timestamp: number) {
  const diff = now - timestamp * 1000

  const SECONDS = 1000,
    MINUTES = SECONDS * 60,
    HOURS = MINUTES * 60,
    DAYS = HOURS * 24

  if (diff < SECONDS) return '刚刚'
  if (diff < MINUTES) return `${Math.floor(diff / SECONDS)}秒前`
  if (diff < HOURS)
    return `${Math.floor(diff / MINUTES)}分钟${Math.floor(
      (diff % MINUTES) / SECONDS
    )}秒前`
  if (diff < DAYS)
    return `${Math.floor(diff / HOURS)}小时${Math.floor(
      (diff % HOURS) / MINUTES
    )}分钟前`

  const date = new Date(0)
  date.setUTCSeconds(timestamp)
  return date.toLocaleDateString()
}

export const TempsTableBody = React.memo(
  ({ filteredTemps }: { filteredTemps: Template[] | null }) => {
    const [now, setNow] = React.useState(Date.now())
    useEffect(() => {
      const timer = setInterval(() => {
        setNow(Date.now())
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    }, [])

    return filteredTemps?.map(temp => (
      <TempsTableRow
        key={temp.id}
        temp={temp}
        lastModified={formatDate(now, temp.lastModified)}
        created={formatDate(now, temp.created)}
      />
    ))
  }
)

TempsTableBody.displayName = 'TempsTableBody'
