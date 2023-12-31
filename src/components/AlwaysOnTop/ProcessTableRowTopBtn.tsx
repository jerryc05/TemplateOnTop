import { DefaultApi, WindowInfo } from '@/_generated/typescript-fetch'
import { Button } from '@/shadcnui/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

export function ProcessTableRoTopBtn({
  window,
  refresh,
}: Readonly<{ window: WindowInfo; refresh: () => void }>) {
  const [requesting, setRequesting] = React.useState(false)
  return (
    <Button
      variant={window.isTop ? 'default' : 'outline'}
      className='hover:scale-105 active:scale-100'
      onClick={() => {
        setRequesting(true)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        new DefaultApi()
          .topmostWindowsTopmostPost({
            topMostRequest: { hwnd: window.hwnd, top: !window.isTop },
          })
          .catch(
            // todo toast
            console.error
          )
          .then(refresh)
          .finally(() => {
            setRequesting(false)
          })
      }}
    >
      {requesting ? (
        <Loader2 className='animate-spin'></Loader2>
      ) : (
        (window.isTop ? '已' : '未') + '置顶'
      )}
    </Button>
  )
}
