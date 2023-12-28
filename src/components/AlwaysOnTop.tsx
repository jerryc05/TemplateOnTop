import { appWindow } from '@tauri-apps/api/window'
import React, { useEffect, useState } from 'react'
import { Pin, PinOff } from 'lucide-react'

export function AlwaysOnTop(
  props: Readonly<React.HTMLAttributes<HTMLButtonElement>>
) {
  const [top, setTop] = useState(true)
  useEffect(() => {
    appWindow.setAlwaysOnTop(top)
  }, [top])

  const newProps: typeof props = {
    ...props,
    style: {
      ...props.style,
      height: '3.5rem',
      width: '3.5rem',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'calc(infinity*1px)',
    },
    onClick: () => setTop(!top),
  }
  return <button {...newProps}>{top ? <Pin /> : <PinOff />}</button>
}
