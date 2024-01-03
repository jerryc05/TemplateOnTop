import { DefaultApi } from '@/_generated/typescript-fetch'
import { Button } from '@/shadcnui/ui/button'
import { bottomRightBtnClass } from '@/utils'
import { Check, Save, X } from 'lucide-react'
import React from 'react'

export const SaveBtn = React.memo(
  ({
    className,
    isChanged,
    onSaveSuccess,
    id,
    html,
  }: Readonly<{
    className: React.HTMLAttributes<never>['className']
    isChanged: boolean
    onSaveSuccess: () => void
    id: number
    html: string
  }>) => {
    const [pending, setPending] = React.useState<boolean>(false)
    return (
      <Button
        className={`${bottomRightBtnClass} ${
          !pending ? (isChanged ? 'animate-pulse border-red-500' : '') : ''
        } ${className}`}
        variant='outline'
        disabled={!isChanged}
        onClick={() => {
          setPending(true)
          new DefaultApi()
            .patchTemplateTemplatesIdIdPatch({
              id,
              templateOnlyTitleOrHtml: {
                html,
              },
            })
            .then(onSaveSuccess)
            .catch(console.error)
            .finally(() => {
              setPending(false)
            })
        }}
      >
        <Save />
      </Button>
    )
  }
)

SaveBtn.displayName = 'SaveBtn'
