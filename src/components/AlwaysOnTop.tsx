import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useState } from 'react'

export function AlwaysOnTop() {
  const [top, setTop] = useState(true)
  useEffect(() => {
    appWindow.setAlwaysOnTop(top)
  }, [top])
  return (
    <button onClick={() => setTop(!top)}>
      {'On Top ' + (top ? 'En' : 'Dis') + 'abled'}
    </button>
  )
}
