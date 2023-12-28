import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.css'

// export function QuillEditor() {
//   const tooltipRef = React.useRef<HTMLDivElement>(null)
//   const containerRef = React.useRef<HTMLDivElement>(null)
//   const editorRef = React.useRef<Quill | null>(null)
//   const [value, setValue] = useState('')

//   useEffect(() => {
//     console.log(
//       QuillEditor.name +
//         ' useEffect triggered ' +
//         editorRef.current +
//         containerRef.current +
//         tooltipRef.current
//     )
//     if (containerRef.current != null && tooltipRef.current != null) {
//       editorRef.current = new Quill(containerRef.current, {
//         bounds: containerRef.current,
//         debug: 'info',
//         theme: 'snow',
//         modules: {
//           toolbar: {
//             container: toolbarOpt, //tooltipRef.current,
//           },
//         },
//       })
//       console.log(
//         QuillEditor.name +
//           ' useEffect new Quill ' +
//           editorRef.current +
//           containerRef.current +
//           tooltipRef.current
//       )
//     }

//     return () => {
//       if (editorRef.current != null) editorRef.current = null
//       // if (containerRef.current != null) containerRef.current.innerHTML = ''
//       console.log(
//         QuillEditor.name +
//           ' useEffect distroyed ' +
//           editorRef.current +
//           containerRef.current +
//           tooltipRef.current
//       )
//     }
//   }, [])

//   return (
//     <>
//       <div ref={tooltipRef} />
//       <div ref={containerRef} />
//     </>
//     // <ReactQuill
//     //   style={{
//     //     flexGrow: 1,
//     //     display: 'flex',
//     //     flexDirection: 'column',
//     //   }}
//     //   theme='snow'
//     //   value={value}
//     //   onChange={setValue}
//     //   modules={{
//     //     toolbar: toolbarOpt,
//     //   }}
//     //   formats={formats}
//     // />
//   )
// }

export class QuillEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({ editorHtml: html })
  }

  handleThemeChange(newTheme) {
    if (newTheme === 'core') newTheme = null
    this.setState({ theme: newTheme })
  }

  render() {
    return (
      <ReactQuill
        style={{
          flexGrow: 1,
          //
          padding: '1rem',
          paddingTop: 0,
          //
          display: 'flex',
          flexDirection: 'column',
        }}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={{
          toolbar: toolbarOpt,
        }}
        // formats={getFormats()}
        placeholder='Write something amazing...'
      />
    )
  }
}

const toolbarOpt = [
  // ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  // ['blockquote', 'code-block'],

  // [{ header: 1 }, { header: 2 }], // custom button values
  // [{ list: 'ordered' }, { list: 'bullet' }],
  // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  // [{ direction: 'rtl' }], // text direction

  // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  // [{ align: [] }],

  // ['clean'], // remove formatting button
  [{ font: [] }, { size: [] }],
  ['bold', 'italic', 'underline', 'link', 'color', 'background'],
  ['align', 'direction', 'code', 'code-block', 'script'],
  ['strike', 'blockquote'],
  [{ header: '1' }, { header: '2' }, { header: '3' }],
  ['formula', 'image', 'video'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['clean'],
]

// const formats_: string[] = []

// function getFormats() {
//   if (formats_.length === 0) {
//     toolbarOpt.forEach(opt => {
//       opt.forEach(x => {
//         if (typeof x === 'string') formats_.push(x)
//         else {
//           Object.entries(x).forEach(([key, value]) => {
//             formats_.push(key)
//             if (typeof value === 'string') formats_.push(value)
//           })
//         }
//       })
//     })
//     console.log(formats_)
//   }
//   return formats_
// }
