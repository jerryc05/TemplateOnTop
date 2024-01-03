import React, { useEffect } from 'react'
import { AlwaysOnTop } from './components/AlwaysOnTop'
import { MyWangEditor as Editor } from './components/WangEditor'
import { Wifi, WifiOff } from 'lucide-react'
import { DefaultApi } from './_generated/typescript-fetch'

export function App() {
  const [title, setTitle] = React.useState<string>('Template Helper!')
  const [online, setOnline] = React.useState<boolean>(false)

  useEffect(() => {
    let stop = false
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (!stop) {
        try {
          await new DefaultApi().pingPingGetRaw()
          setOnline(true)
        } catch (e) {
          console.dir(e)
          setOnline(false)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    })().catch(console.error)
    return () => {
      stop = true
    }
  }, [setOnline])

  return (
    <>
      <AlwaysOnTop className='fixed right-5 bottom-[2rem] z-10' />
      <div
        className={`p-2 absolute rounded-full right-1 top-1 ${
          online ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        {online ? <Wifi /> : <WifiOff />}
      </div>
      <div className='h-full flex flex-col'>
        <div className='my-3 text-center font-bold text-4xl'>{title}</div>
        <Editor className='m-[2rem] mt-0 flex-grow' setTitle={setTitle} />
      </div>
    </>
  )
}
