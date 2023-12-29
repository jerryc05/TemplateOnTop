import { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

import '@wangeditor/editor/dist/css/style.css'
import './index.css'
import {
  FONT_WEB_JP_FALLBACK,
  FONT_WEB_OUTLOOK_FALLBACK,
  FONT_YAHEI,
} from '../../utils'

const fontFamilyList = [
  {
    name: '微软雅黑',
    value: FONT_YAHEI,
  },
  { name: 'Meiryo UI', value: `Meiryo UI, ${FONT_WEB_JP_FALLBACK}` },
  { name: 'Meiryo', value: `Meiryo, ${FONT_WEB_JP_FALLBACK}` },
  '黑体',
  '仿宋',
  '楷体',
  '标楷体',
  '华文仿宋',
  '华文楷体',
  '宋体',
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
  return x
})

export function MyWangEditor(props: React.HtmlHTMLAttributes<HTMLElement>) {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('')

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
          onChange={editor => setHtml(editor.getHtml())}
          mode='default'
          style={{ flexGrow: 1 }}
        />
      </div>
    </>
  )
}
