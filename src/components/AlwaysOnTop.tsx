import React, { useState } from 'react'
import { Button } from '../shadcnui/ui/button'
import { Pin, PinOff } from 'lucide-react'

export function AlwaysOnTop({
  className,
}: Readonly<{
  className: React.HTMLAttributes<never>['className']
}>) {
  const [top, setTop] = useState(true)

  return (
    <Button
      className={`w-14 h-14 p-0 rounded-full shadow-2xl hover:scale-110 active:scale-100 ${className}`}
      variant={top ? 'outline' : 'default'}
      onClick={() => {
        //todo
        setTop(!top)
      }}
    >
      {top ? <Pin className='rotate-45' /> : <PinOff />}
      {/* {'已' + (top ? '' : '取消') + '置顶'} */}
    </Button>
  )
}
