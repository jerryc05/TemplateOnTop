import React from 'react'
import { AlwaysOnTop } from '@/components/AlwaysOnTop'
import { MyWangEditor as Editor } from '@/components/WangEditor'
import { Status } from '@/components/Status'
export function App() {
  const [title, setTitle] = React.useState<string>('Template Helper!')
  return (
    <>
      <AlwaysOnTop className='fixed right-5 bottom-[2rem] z-10' />
      <Status />
      <div className='h-full flex flex-col'>
        <div className='my-3 text-center font-bold text-4xl'>{title}</div>
        <Editor className='m-[2rem] mt-0 flex-grow' setTitle={setTitle} />
      </div>
    </>
  )
}
