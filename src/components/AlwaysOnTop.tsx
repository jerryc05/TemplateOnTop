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

  return (
    <button
      {...{
        ...props,
        style: {
          ...props.style,
          height: '3.5rem',
          width: '3.5rem',
          //
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          //
          borderWidth: 0,
          borderRadius: 'calc(infinity*1px)',
          //
          backgroundColor: 'transparent',
          cursor: 'pointer',
          boxShadow: '0.1rem 0.1rem 1rem #666',
        },
        onClick: () => setTop(!top),
      }}
    >
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
