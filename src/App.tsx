// import { invoke } from '@tauri-apps/api/tauri'
import './App.css'
import { AlwaysOnTop } from './components/AlwaysOnTop'
import { Quill } from './components/Quill'

function App() {
  return (
    <>
      <AlwaysOnTop style={{ position: 'fixed', right: 0 }} />
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h1>Template Helper!</h1>
        <Quill />
      </div>
    </>
  )
}

export default App
