import React, { useEffect, useState } from 'react'
import { Button } from '../shadcnui/ui/button'
import { Pin, PinOff } from 'lucide-react'

export function AlwaysOnTop({
  className,
}: Readonly<{
  className: React.HTMLAttributes<never>['className']
}>) {
  const [top, setTop] = useState(true)
  // useEffect(() => {
  //   appWindow.setAlwaysOnTop(top)
  // }, [top])

  return (
    <Button
      className={'p-1 px-3 ' + className}
      variant={top ? 'outline' : 'default'}
      onClick={() => {
        //todo
        setTop(!top)
      }}
    >
      {top ? <Pin className='rotate-45' /> : <PinOff />}
      {'已' + (top ? '' : '取消') + '置顶'}
    </Button>
  )
}
