import {
  DefaultApi,
  ResponseError,
  WindowInfo,
} from '@/_generated/typescript-fetch'
import { Button } from '@/shadcnui/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcnui/ui/table'
import { Loader2 } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'
import { ProcessTableRoTopBtn } from './TableContentTopBtn'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shadcnui/ui/tooltip'
export function TableContent() {
  const [info, setInfo] = React.useState<
    (WindowInfo & { suggested?: boolean })[] | string | null
  >([
    {
      hwnd: 4720188,
      title:
        'How can I get Python Argparse to list choices only once? - Stack Overflow - Google Chrome',
      isTop: 0,
      nameOfPid: 'chrome.exe',
      exeOfPid: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    },
    {
      hwnd: 7736472,
      title: 'Template Helper - Google Chrome',
      isTop: 0,
      nameOfPid: 'chrome.exe',
      exeOfPid: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    },
    {
      hwnd: 65746,
      title: '',
      isTop: 8,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 65830,
      title: '',
      isTop: 8,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 672600058,
      title: 'TableContent.tsx - TemplateOnTop - Visual Studio Code',
      isTop: 0,
      nameOfPid: 'Code.exe',
      exeOfPid: 'D:\\Program Files\\Microsoft VS Code\\Code.exe',
    },
    {
      hwnd: 68502,
      title: 'config - PoseFall [SSH: workstation] - Visual Studio Code',
      isTop: 0,
      nameOfPid: 'Code.exe',
      exeOfPid: 'D:\\Program Files\\Microsoft VS Code\\Code.exe',
    },
    {
      hwnd: 67598,
      title: '💤ChatZKW-4.0🎵 | 大橘想吃小鱼干 - Discord',
      isTop: 0,
      nameOfPid: 'Discord.exe',
      exeOfPid:
        'C:\\Users\\siyuan\\AppData\\Local\\Discord\\app-1.0.9028\\Discord.exe',
    },
    {
      hwnd: 2624358,
      title: '',
      isTop: 0,
      nameOfPid: 'bash.exe',
      exeOfPid: 'E:\\Program Files\\Git\\bin\\bash.exe',
    },
    {
      hwnd: 527104,
      title: 'siyuan@siyuanworkstation (192.168.1.170) - byobu',
      isTop: 0,
      nameOfPid: 'WindowsTerminal.exe',
      exeOfPid:
        'C:\\Program Files\\WindowsApps\\Microsoft.WindowsTerminal_1.18.3181.0_x64__8wekyb3d8bbwe\\WindowsTerminal.exe',
    },
    {
      hwnd: 460316,
      title: 'Settings',
      isTop: 0,
      nameOfPid: 'SystemSettings.exe',
      exeOfPid: 'C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe',
    },
    {
      hwnd: 394936,
      title: 'Settings',
      isTop: 0,
      nameOfPid: 'ApplicationFrameHost.exe',
      exeOfPid: 'C:\\Windows\\System32\\ApplicationFrameHost.exe',
    },
    {
      hwnd: 133464,
      title: '',
      isTop: 0,
      nameOfPid: 'rustdesk.exe',
      exeOfPid: 'D:\\Program Files\\RustDesk\\rustdesk.exe',
    },
    {
      hwnd: 200546,
      title: '',
      isTop: 0,
      nameOfPid: 'Monitor.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\Monitor.exe',
    },
    {
      hwnd: 69534,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'Monitor.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\Monitor.exe',
    },
    {
      hwnd: 69530,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'Monitor.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\Monitor.exe',
    },
    {
      hwnd: 67240,
      title: 'Monitor',
      isTop: 0,
      nameOfPid: 'Monitor.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\Monitor.exe',
    },
    {
      hwnd: 67268,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'Monitor.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\Monitor.exe',
    },
    {
      hwnd: 67266,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'Monitor.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\Monitor.exe',
    },
    {
      hwnd: 67260,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'Monitor.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\Monitor.exe',
    },
    {
      hwnd: 67184,
      title: 'GPU Tweak III',
      isTop: 0,
      nameOfPid: 'GPU Tweak III.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\GPU Tweak III.exe',
    },
    {
      hwnd: 67214,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'GPU Tweak III.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\GPU Tweak III.exe',
    },
    {
      hwnd: 67212,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'GPU Tweak III.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\GPU Tweak III.exe',
    },
    {
      hwnd: 67206,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'GPU Tweak III.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\GPU Tweak III.exe',
    },
    {
      hwnd: 67204,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'GPU Tweak III.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\GPU Tweak III.exe',
    },
    {
      hwnd: 67198,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'GPU Tweak III.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\GPU Tweak III.exe',
    },
    {
      hwnd: 67192,
      title: 'SOUI_DUMMY_WND',
      isTop: 0,
      nameOfPid: 'GPU Tweak III.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\GPUTweakIII\\GPU Tweak III.exe',
    },
    {
      hwnd: 67076,
      title: '',
      isTop: 0,
      nameOfPid: 'Razer Synapse Service Process.exe',
      exeOfPid:
        'C:\\Program Files (x86)\\Razer\\Synapse3\\UserProcess\\Razer Synapse Service Process.exe',
    },
    {
      hwnd: 67034,
      title: 'NVIDIA GeForce Overlay',
      isTop: 0,
      nameOfPid: 'NVIDIA Share.exe',
      exeOfPid:
        'C:\\Program Files\\NVIDIA Corporation\\NVIDIA GeForce Experience\\NVIDIA Share.exe',
    },
    {
      hwnd: 131524,
      title: 'Windows Input Experience',
      isTop: 0,
      nameOfPid: 'TextInputHost.exe',
      exeOfPid:
        'C:\\Windows\\SystemApps\\MicrosoftWindows.Client.CBS_cw5n1h2txyewy\\TextInputHost.exe',
    },
    {
      hwnd: 66442,
      title: '',
      isTop: 0,
      nameOfPid: 'AISuite3.exe',
      exeOfPid: 'C:\\Program Files (x86)\\ASUS\\AI Suite III\\AISuite3.exe',
    },
    {
      hwnd: 65954,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 65972,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 65982,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 131252,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 65924,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 65922,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 65920,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 131274,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 68016,
      title: '',
      isTop: 0,
      nameOfPid: 'Adobe Desktop Service.exe',
      exeOfPid:
        'C:\\Program Files (x86)\\Common Files\\Adobe\\Adobe Desktop Common\\ADS\\Adobe Desktop Service.exe',
    },
    {
      hwnd: 333385326,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 6555926,
      title: '',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
    {
      hwnd: 65858,
      title: 'Program Manager',
      isTop: 0,
      nameOfPid: 'explorer.exe',
      exeOfPid: 'C:\\Windows\\explorer.exe',
    },
  ])

  const refresh = useCallback(() => {
    const uniqueId = ` - ${Date.now()}`
    document.title += uniqueId
    new Promise((resolve, reject) => {
      setTimeout(resolve, 500)
    })
      .then(() => new DefaultApi().visibleWindowsWindowsPost())
      .then(list_ => {
        const list: (WindowInfo & { suggested?: boolean })[] = list_
        list.forEach((window, idx) => {
          if (window.title.includes(uniqueId)) {
            list[idx].suggested = true
            list.unshift(list.splice(idx, 1)[0])
          }
        })
        setInfo(list)
      })
      .catch(e => {
        if (!(e instanceof ResponseError)) return
        console.error(e)
        console.dir(e)
        if (e instanceof ResponseError && e.response.status === 400) {
          e.response
            .json()
            .then((x: { detail: string }) => {
              setInfo(x.detail)
            })
            .catch(console.error)
        } else {
          // todo toast
          alert(e.message)
        }
      })
      .finally(() => {
        document.title = document.title.replace(uniqueId, '')
      })
  }, [setInfo])

  // useEffect(() => {
  //   refresh()
  // }, [refresh])

  if (!info)
    return (
      <div className='mt-4 flex justify-center'>
        <Loader2 className='animate-spin' size='40' />
      </div>
    )

  if (typeof info === 'string') return <div>{info}</div>

  const processTableCellPadding = 'p-2 py-1'

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={processTableCellPadding}>标题</TableHead>
            <TableHead className={`${processTableCellPadding} w-2/12`}>
              进程名
            </TableHead>
            <TableHead
              className={`${processTableCellPadding} w-16 text-center`}
            >
              置顶
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='h-20'>
          {info.map(win => (
            <TableRow key={win.hwnd}>
              <TableCell
                className={`${processTableCellPadding} font-medium ${
                  win.suggested ? 'font-bold' : ''
                }`}
              >
                {win.title}
              </TableCell>
              <TableCell className={processTableCellPadding}>
                <Tooltip>
                  <TooltipTrigger>{win.nameOfPid}</TooltipTrigger>
                  <TooltipContent>{win.exeOfPid}</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className={processTableCellPadding}>
                <ProcessTableRoTopBtn win={win} refresh={refresh} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className='text-right'>$2,500.00</TableCell>
                </TableRow>
              </TableFooter> */}
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      </Table>
      <Button
        variant='outline'
        className='mt-1 hover:scale-105 active:scale-90'
        onClick={() => {
          setInfo(null)
          refresh()
        }}
      >
        刷新
      </Button>
    </>
  )
}
