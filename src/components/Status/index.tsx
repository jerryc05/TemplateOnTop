import { ArrowDownToLine, Wifi, WifiOff } from 'lucide-react'
import React from 'react'

import { DefaultApi } from '@/_generated/typescript-fetch'
import * as verJson from '@/version.json'
export function Status() {
  const [backendVersion, setBackendVersion] = React.useState<number | null>(
    null
  )

  React.useEffect(() => {
    let stop = false
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (!stop) {
        try {
          const ver =
            (await new DefaultApi().versionVersionGet()) as typeof verJson
          setBackendVersion(ver.version)
        } catch (e) {
          console.dir(e)
          setBackendVersion(null)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    })().catch(console.error)
    return () => {
      stop = true
    }
  }, [setBackendVersion])

  return (
    <div className='absolute right-1 top-0 flex gap-x-1'>
      {backendVersion != null && backendVersion > verJson.version && (
        <div className='flex justify-center items-center gap-x-1 border-gray-500 rounded-full hover:scale-110 animate-all duration-500 group/outerrefresh'>
          <ArrowDownToLine
            strokeWidth='2.5'
            className='animate-bounce group-hover/outerrefresh:animate-none  group-hover/outerrefresh:hidden'
          />
          <div className='pr-2 text-sm hidden group-hover/outerrefresh:block'>
            <b>
              <u>刷新网页</u>
            </b>
            更新新版本 {verJson.version}→{backendVersion}
          </div>
        </div>
      )}

      {backendVersion != null ? (
        <Wifi strokeWidth='2.5' color='#4C9900' />
      ) : (
        <WifiOff strokeWidth='2.5' color='red' />
      )}
    </div>
  )
}
