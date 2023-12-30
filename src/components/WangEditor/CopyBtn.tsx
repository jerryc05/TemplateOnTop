import { Button } from '@/shadcnui/ui/button'
import { Copy } from 'lucide-react'
export function CopyBtn({
  className,
}: Readonly<{
  className: React.HTMLAttributes<never>['className']
}>) {
  return (
    <Button
      className={`w-14 h-14 p-0 rounded-full shadow-2xl hover:scale-110 active:scale-100 ${className}`}
      variant='outline'
    >
      <Copy />
      {/* 复制 */}
    </Button>
  )
}
