import { Button } from '@/shadcnui/ui/button'
import { bottomRightBtnClass } from '@/utils'
import { FolderKanban } from 'lucide-react'
import React from 'react'

export const FileMgr = React.memo(
  ({ className }: { className: React.HTMLAttributes<never>['className'] }) => {
    return (
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
    )
  }
)
