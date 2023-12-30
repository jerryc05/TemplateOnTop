import React, { useEffect, useState } from 'react'
import { TbPinned, TbPinnedOff } from 'react-icons/tb'

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
    <Button
      color='primary'
      size='lg'
      className={'p-1 px-3 ' + className}
      variant={top ? 'ghost' : 'solid'}
      startContent={top ? <TbPinned /> : <TbPinnedOff />}
      onClick={() => setTop(!top)}
    >
      {'已' + (top ? '' : '取消') + '置顶'}
    </Button>
  )
}
