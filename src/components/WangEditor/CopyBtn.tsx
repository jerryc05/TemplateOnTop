import { Button } from '@/shadcnui/ui/button'
import { bottomRightBtnClass } from '@/utils'
import { IDomEditor } from '@wangeditor/editor'
import { Check, Copy, X } from 'lucide-react'
import React from 'react'

export const CopyBtn = React.memo(
  ({
    className,
    editor,
  }: Readonly<{
    className: React.HTMLAttributes<never>['className']
    editor: IDomEditor | null
  }>) => {
    const [status, setStatus] = React.useState<boolean | null>(null)
    return (
      <Button
        className={`${bottomRightBtnClass} ${
          status == null
            ? ''
            : status
            ? 'bg-green-500 hover:bg-green-500'
            : 'bg-red-500 hover:bg-red-500'
        } ${className}`}
        variant='outline'
        onClick={() => {
          if (editor == null) return
          const blob = new Blob([editor.getHtml()], { type: 'text/html' })
          const text = new Blob([editor.getText()], { type: 'text/plain' })
          navigator.clipboard
            .write([
              new ClipboardItem({ [blob.type]: blob, [text.type]: text }),
            ])
            .then(() => {
              setStatus(true)
              setTimeout(() => {
                setStatus(null)
              }, 1500)
            })
            .catch(e => {
              // todo toast
              console.error(e)
            })
        }}
      >
        {status == null ? <Copy /> : status ? <Check /> : <X />}
      </Button>
    )
  }
)
