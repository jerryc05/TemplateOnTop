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
      //
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //
      borderRadius: 'calc(infinity*1px)',
      //
      backgroundColor: '#d3d3d3',
    },
    onClick: () => setTop(!top),
  }
  return (
    <button {...newProps}>
      {top ? (
        <Pin
          style={{
            rotate: '45deg',
          }}
        />
      ) : (
        <PinOff />
      )}
    </button>
  )
}
