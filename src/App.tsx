// import { invoke } from '@tauri-apps/api/tauri'
import { AlwaysOnTop } from './components/AlwaysOnTop'
// import { QuillEditor as Editor } from './components/QuillEditor'
import { MyWangEditor as Editor } from './components/WangEditor'

export const App = () => (
  <>
    <AlwaysOnTop
      style={{ position: 'fixed', right: '3rem', bottom: '3rem', zIndex: 10 }}
    />
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Template Helper!</h1>
      <Editor style={{ flexGrow: 1, margin: '2rem', marginTop: 0 }} />
    </div>
  </>
)
