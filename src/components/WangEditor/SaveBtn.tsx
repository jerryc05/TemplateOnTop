import { Button } from '@/shadcnui/ui/button'
import { bottomRightBtnClass } from '@/utils'
import { Check, Save, X } from 'lucide-react'
import React from 'react'

export const SaveBtn = React.memo(
  ({
    className,
    isChanged,
    originalContent,
  }: Readonly<{
    className: React.HTMLAttributes<never>['className']
    isChanged: boolean
    originalContent: string
  }>) => {
    const [status, setStatus] = React.useState<boolean | null>(null)
    return (
      <Button
        className={`${bottomRightBtnClass} ${
          status == null
            ? isChanged
              ? 'animate-pulse border-black'
              : ''
            : status
            ? 'bg-green-500 hover:bg-green-500'
            : 'bg-red-500 hover:bg-red-500'
        } ${className}`}
        variant='outline'
        disabled={!isChanged}
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
        {status == null ? <Save /> : status ? <Check /> : <X />}
      </Button>
    )
  }
)
