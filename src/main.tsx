import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

render(
  <NextUIProvider className='h-full'>
    <App />
  </NextUIProvider>,
  document.getElementById('app')!
)
