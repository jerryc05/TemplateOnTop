import { Copy } from 'lucide-react'

export function CopyBtn(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
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
      }}
    >
      <Copy />
    </button>
  )
}
