import { DefaultApi, Template } from '@/_generated/typescript-fetch'
import { Button } from '@/shadcnui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcnui/ui/dialog'
import { Input } from '@/shadcnui/ui/input'
import { bottomRightBtnClass } from '@/utils'
import { FolderKanban, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { TempsTable } from './TempsTable'
import FlexDocument from 'flexsearch/dist/module/document'
import { type Document as FlexDocT } from '@types/flexsearch'

export const FileMgr = React.memo(
  ({ className }: { className: React.HTMLAttributes<never>['className'] }) => {
    const index = React.useRef<FlexDocT<Template> | null>(null)

    const [allTemps, setAllTemps_] = React.useState<Template[] | null>(null)
    const setAllTemps = React.useCallback(
      (temps: Template[] | null) => {
        setAllTemps_(temps)
        if (temps != null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          index.current = new FlexDocument({
            tokenize: 'full',
            cache: 5,
            language: 'jp',
            document: {
              id: 'id',
              index: ['title', 'html'],
            },
          }) as FlexDocT<Template>
          temps.forEach(temp => {
            index.current?.add(temp)
          })
        } else {
          index.current = null
        }
      },
      [setAllTemps_]
    )

    const refresh = React.useCallback(() => {
      setAllTemps(null)
      return new DefaultApi()
        .getAllTemplatesTemplatesGet()
        .then(setAllTemps)
        .catch(console.error)
    }, [setAllTemps])

    const [searchText, setSearchText] = React.useState('')
    const filteredTemps = React.useMemo(() => {
      if (!searchText || allTemps == null) return allTemps

      const ids: Template['id'][] = []
      const ress = index.current?.search(searchText)

      if (ress != null)
        ress.forEach(res => {
          res.result.forEach(id_ => {
            const id = Number(id_)
            if (!ids.includes(id)) ids.push(id)
          })
        })

      const rv: typeof allTemps = []
      ids.forEach(id => {
        const temp = allTemps.find(temp => temp.id === id)
        if (temp != null) rv.push(temp)
      })
      return rv
    }, [searchText, index, allTemps])

    return (
      <Dialog
        onOpenChange={isOpen => {
          if (isOpen && allTemps == null) refresh().catch(console.error)
        }}
      >
        <DialogTrigger asChild>
          <Button
            className={`${bottomRightBtnClass} ${className}`}
            variant='outline'
          >
            <FolderKanban />
          </Button>
        </DialogTrigger>
        <DialogContent className='max-h-[85vh] max-w-[70vw] flex flex-col'>
          <DialogHeader>
            <DialogTitle>模版管理</DialogTitle>
            <DialogDescription>
              在这里搜索、添加、修改、或删除任何模版
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder='在这里搜索……'
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value)
            }}
          />
          {allTemps != null ? (
            <TempsTable filteredTemps={filteredTemps} />
          ) : (
            <div className='mx-auto'>
              <Loader2 size='40' className='animate-spin' />
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }
)

FileMgr.displayName = 'FileMgr'
