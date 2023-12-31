import { DefaultApi, WindowInfo } from '@/_generated/typescript-fetch'
import { Button } from '@/shadcnui/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

export function ProcessTableRoTopBtn({
  win,
  refresh,
}: Readonly<{ win: WindowInfo; refresh: () => void }>) {
  const [requesting, setRequesting] = React.useState(false)
  return (
    <Button
      variant={win.isTop ? 'default' : 'outline'}
      className='hover:scale-105 active:scale-100'
      onClick={() => {
        setRequesting(true)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        new DefaultApi()
          .topmostWindowsTopmostPost({
            topMostRequest: { hwnd: win.hwnd, top: !win.isTop },
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
        (win.isTop ? '已' : '未') + '置顶'
      )}
    </Button>
  )
}
