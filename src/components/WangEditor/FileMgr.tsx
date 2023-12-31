import { Button } from '@/shadcnui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcnui/ui/dialog'
import { bottomRightBtnClass } from '@/utils'
import { FolderKanban } from 'lucide-react'
import React from 'react'

export const FileMgr = React.memo(
  ({ className }: { className: React.HTMLAttributes<never>['className'] }) => {
    return (
      <Dialog>
        <DialogTrigger>
          <Button
            className={`${bottomRightBtnClass} ${className}`}
            variant='outline'
            onClick={() => {
              // todo
              // if (editor == null) return
              // const blob = new Blob([editor.getHtml()], { type: 'text/html' })
              // const text = new Blob([editor.getText()], { type: 'text/plain' })
              // navigator.clipboard
              //   .write([new ClipboardItem({ [blob.type]: blob, [text.type]: text })])
              //   .then(() => {
              //     setStatus(true)
              //     setTimeout(() => {
              //       setStatus(null)
              //     }, 1500)
              //   })
              //   .catch(e => {
              //     // todo toast
              //     console.error(e)
              //   })
            }}
          >
            <FolderKanban />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
)
