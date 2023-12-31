import { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

import '@wangeditor/editor/dist/css/style.css'
import './index.css'
import {
  FONT_FANGSONG,
  FONT_HEITI,
  FONT_KAITI,
  FONT_SONGTI,
  FONT_WEB_JP_FALLBACK,
  FONT_WEB_OUTLOOK_FALLBACK,
  FONT_YAHEI,
} from '@/utils'
import { CopyBtn } from './CopyBtn'
import { SaveBtn } from './SaveBtn'
import { FileMgr } from './FileMgr'

export function MyWangEditor(
  props: Readonly<React.HTMLAttributes<HTMLDivElement>>
) {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState<string>('')
  const [originalContent, setOriginalContent] = useState<string>('<p><br></p>')

  const toolbarConfig: Partial<IToolbarConfig> = {}
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: 'Start writing something awesome ...',
    MENU_CONF: {
      fontFamily: { fontFamilyList },
    },
  }

  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <CopyBtn
        className='fixed right-5 bottom-[14rem] z-10'
        editor={editor}
      />
      <SaveBtn
        className='fixed right-5 bottom-[10rem] z-10'
        isChanged={html !== originalContent}
        originalContent={originalContent}
      />
      <FileMgr className='fixed right-5 bottom-[6rem] z-10' />
      <div
        {...{
          ...props,
          style: {
            ...props.style,
            border: '0.2rem solid #ccc',
            // borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => {
            setHtml(editor.getHtml())
          }}
          mode='default'
          style={{ flexGrow: 1 }}
        />
      </div>
    </>
  )
}

const fontFamilyList = [
  { name: '微软雅黑', value: FONT_YAHEI },
  { name: 'Meiryo UI', value: `Meiryo UI, ${FONT_WEB_JP_FALLBACK}` },
  { name: 'Meiryo', value: `Meiryo, ${FONT_WEB_JP_FALLBACK}` },
  { name: '黑体', value: FONT_HEITI },
  { name: '仿宋', value: FONT_FANGSONG },
  { name: '楷体', value: FONT_KAITI },
  '标楷体',
  '华文仿宋',
  '华文楷体',
  { name: '宋体', value: FONT_SONGTI },
  'Arial',
  'Tahoma',
  'Verdana',
  'Times New Roman',
  'Courier New',
].map(x => {
  if (typeof x === 'string')
    return {
      name: x,
      value: `${x}, ${FONT_WEB_OUTLOOK_FALLBACK}`,
    }
  return {
    name: x.name,
    value: `${x.value}, ${FONT_WEB_OUTLOOK_FALLBACK}`,
  }
})
