import React, { useEffect, useState } from 'react'
import { TbPinned, TbPinnedOff } from 'react-icons/tb'
import { Button } from '../shadcnui/ui/button'

export function AlwaysOnTop({
  className,
}: Readonly<{
  className: React.HTMLAttributes<any>['className']
}>) {
  const [top, setTop] = useState(true)
  // useEffect(() => {
  //   appWindow.setAlwaysOnTop(top)
  // }, [top])

  return (
    <Button variant={top ? 'outline' : 'default'} onClick={() => setTop(!top)}>
      <div className={'p-1 px-3 ' + className}>
        {top ? <TbPinned /> : <TbPinnedOff />}
        {'已' + (top ? '' : '取消') + '置顶'}
      </div>
    </Button>
  )
}
