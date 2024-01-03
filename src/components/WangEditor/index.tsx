import React from 'react'
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
import { TempMgr } from './TempMgr'
import { DEFAULT_HTML } from './util'
import { TemplateContent } from '@/_generated/typescript-fetch'

export function MyWangEditor({
  className,
  setTitle,
}: {
  className: Readonly<React.HTMLAttributes<never>['className']>
  setTitle: (title: string) => void
}) {
  const [editor, setEditor] = React.useState<IDomEditor | null>(null)
  const [id,setId] = React.useState<number>(0)
  const [html, setHtml] = React.useState<string>('')
  const [originalHtml, setOriginalHtml] = React.useState<string>(DEFAULT_HTML)

  const toolbarConfig: Partial<IToolbarConfig> = {}
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: 'Start writing something awesome ...',
    MENU_CONF: {
      fontFamily: { fontFamilyList },
    },
  }

  React.useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  const onTempOpened = React.useCallback(
    (id:number,temp: TemplateContent) => {
      setId(id)
      setTitle(temp.title)
      setHtml(temp.html)
      setOriginalHtml(temp.html)
    },
    [setTitle, setHtml, setOriginalHtml]
  )

  const onSaveSuccess = React.useCallback(() => {
    setOriginalHtml(html)
  }, [setOriginalHtml, html])

  return (
    <>
      <CopyBtn className='fixed right-5 bottom-[14rem] z-10' editor={editor} />
      <SaveBtn
        className='border-2 fixed right-5 bottom-[10rem] z-10'
        isChanged={html !== originalHtml}
        onSaveSuccess={onSaveSuccess}
        id={id}
        html={html}
      />
      <TempMgr
        className='fixed right-5 bottom-[6rem] z-10'
        onTempOpened={onTempOpened}
      />
      <div
        className={`${className} flex flex-col border-[0.2rem] border-[#ccc]`}
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
          className={`grow`}
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
