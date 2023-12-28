// import { invoke } from '@tauri-apps/api/tauri'
import './App.css'
import { AlwaysOnTop } from './components/AlwaysOnTop'
import { Quill } from './components/Quill'

function App() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1>Template Helper!</h1>
      <AlwaysOnTop style={{ position: 'fixed' }} />
      <Quill />
    </div>
  )
}

export default App
