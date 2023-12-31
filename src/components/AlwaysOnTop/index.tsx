import React, { useState } from 'react'
import { Button } from '../../shadcnui/ui/button'
import { Pin, PinOff, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcnui/ui/dialog'
import { TableContent } from './TableContent'

export function AlwaysOnTop({
  className,
}: Readonly<{
  className: React.HTMLAttributes<never>['className']
}>) {
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={`w-14 h-14 p-0 rounded-full shadow-2xl hover:scale-110 active:scale-100 ${className}`}
          variant={top ? 'outline' : 'default'}
        >
          {dialogOpen ? (
            <Loader2 className='animate-spin' />
          ) : top ? (
            <Pin
            // className='rotate-45'
            />
          ) : (
            <PinOff />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[85vh] max-w-[95vw] flex flex-col'>
        <DialogHeader>
          <DialogTitle>窗口置顶</DialogTitle>
          <DialogDescription>选择想要置顶的窗口</DialogDescription>
        </DialogHeader>
        <TableContent />
        {/* <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
