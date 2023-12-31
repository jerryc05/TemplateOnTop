import { Button } from '@/shadcnui/ui/button'
import { Copy } from 'lucide-react'
export function CopyBtn({
  className,
  html,
}: Readonly<{
  className: React.HTMLAttributes<never>['className']
  html: string
}>) {
  return (
    <Button
      className={`w-14 h-14 p-0 rounded-full shadow-2xl hover:scale-110 active:scale-100 ${className}`}
      variant='outline'
      onClick={() => {
        const type = 'text/html'
        const blob = new Blob([html], { type })
        navigator.clipboard.write([new ClipboardItem({ [type]: blob })]).catch(
          // todo toast
          console.error
        )
      }}
    >
      <Copy />
    </Button>
  )
}
