import { TbCopy } from 'react-icons/tb'

export function CopyBtn({
  className,
}: Readonly<{
  className: React.HTMLAttributes<any>['className']
}>) {
  return (
    <Button
      color='primary'
      size='lg'
      className={'p-1 px-3 ' + className}
      variant='bordered'
      startContent={<TbCopy />}
      // onClick={() => {}}
    >
      复制
    </Button>
  )
}
