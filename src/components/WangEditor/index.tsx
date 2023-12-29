import { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

import '@wangeditor/editor/dist/css/style.css'
import './index.css'
import { FONT_YAHEI } from '../../utils'

export function MyWangEditor(props: React.HtmlHTMLAttributes<HTMLElement>) {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('')

  const toolbarConfig: Partial<IToolbarConfig> = {}
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: 'Start writing something awesome ...',
    MENU_CONF: {
      fontFamily: {
        fontFamilyList: [
          { name: '黑体', value: '黑体' },
          '仿宋',
          '楷体',
          '标楷体',
          '华文仿宋',
          '华文楷体',
          '宋体',
          { name: '微软雅黑', value: FONT_YAHEI },
          'Arial',
          'Tahoma',
          'Verdana',
          'Times New Roman',
          'Courier New',
        ],
      },
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
