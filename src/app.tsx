import { IconContext } from 'react-icons'
import { AlwaysOnTop } from './components/AlwaysOnTop'
import { MyWangEditor as Editor } from './components/WangEditor'

export const App = () => (
  <IconContext.Provider value={{ className: 'w-full h-full' }}>
    <AlwaysOnTop className='fixed right-10 bottom-10 z-10' />
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className='my-3 text-center font-bold text-4xl'>
        Template Helper!
      </div>
      <Editor style={{ flexGrow: 1, margin: '2rem', marginTop: 0 }} />
    </div>
  </IconContext.Provider>
)
