import { Button } from '@/shadcnui/ui/button'
import { Copy } from 'lucide-react'
export function CopyBtn({
  className,
}: Readonly<{
  className: React.HTMLAttributes<never>['className']
}>) {
  return (
    <Button
      // color='primary'
      // size='lg'
      className={'p-1 px-3 ' + className}
      variant='outline'
      // onClick={() => {}}
    >
      <Copy /> 复制
    </Button>
  )
}
