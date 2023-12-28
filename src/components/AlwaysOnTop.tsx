import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useState } from 'react'
import { Pin, PinOff } from 'lucide-react'

export function AlwaysOnTop(
  props: Readonly<React.HTMLAttributes<SVGSVGElement>>
) {
  const [top, setTop] = useState(true)
  useEffect(() => {
    appWindow.setAlwaysOnTop(top)
  }, [top])

  const newProps = {
    ...props,
    style: { ...props.style, width: '6rem', padding: '0.5rem' },
    onClick: () => setTop(!top),
  }
  return top ? <Pin {...newProps} /> : <PinOff {...newProps} />
}
