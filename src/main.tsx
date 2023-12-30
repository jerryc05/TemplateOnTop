import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

render(
  <NextUIProvider>
    <App />
  </NextUIProvider>,
  document.getElementById('app')!
)
