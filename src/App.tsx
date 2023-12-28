// import { invoke } from '@tauri-apps/api/tauri'
import React from 'react'
import './App.css'
import { AlwaysOnTop } from './components/AlwaysOnTop'
import { QuillEditor } from './components/QuillEditor'

export const App = () => (
  <>
    <AlwaysOnTop
      style={{ position: 'fixed', right: '3rem', bottom: '3rem', zIndex: 10 }}
    />
    <div
      style={{
        height: '100%',
        margin: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Template Helper!</h1>
      <QuillEditor />
    </div>
  </>
)
