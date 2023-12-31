import { Button } from '@/shadcnui/ui/button'
import { IDomEditor } from '@wangeditor/editor'
import { Copy } from 'lucide-react'
import React from 'react'

export function CopyBtn({
  className,
  editor,
}: Readonly<{
  className: React.HTMLAttributes<never>['className']
  editor: IDomEditor
}>) {
  const [icon, setIcon] = React.useState<React.ReactNode | null>(null)
  return (
    <Button
      className={`w-14 h-14 p-0 rounded-full shadow-2xl hover:scale-110 active:scale-100 ${className}`}
      variant='outline'
      onClick={() => {
        const blob = new Blob([editor.getHtml()], { type: 'text/html' })
        const text = new Blob([editor.getText()], { type: 'text/plain' })
        navigator.clipboard
          .write([new ClipboardItem({ [blob.type]: blob, [text.type]: text })])
          .then(() => {
            setIcon(<Copy />)
            setTimeout(() => {
              setIcon(null)
            }, 1000)
          })
          .catch(e => {
            // todo toast
            console.error(e)
          })
      }}
    >
      {icon ?? <Copy />}
    </Button>
  )
}
