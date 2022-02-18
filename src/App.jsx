import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react'
import useCreateDesing from './hooks/useCreateDesing';

function App() {

  const [valueEditor, setValueEditor] = useState({
    html: '',
    css: '',
    js: ''
  });
  const { html, css, js } = valueEditor;
  const refIframePreview = useRef(null);

  const createDesing = (html, css, js) => {
    return `
    <html>
      <head>
          <style>
          ${css}
          </style>
      </head>
      <body>
          ${html}
          
          <script>
           ${js}
          </script>
      </body>
    </html>
  `
  }

  useEffect(() => {
    refIframePreview.current.src = createDesing(html, css, js);
  }, [html, css, js])


  const handleEditorChange = (value) => {
    setValueEditor({
      ...valueEditor,
      ...value
    })
  }

  return (
    <div className='editor'>

      <div id="html">
        <Editor
          language='html'
          value={html}
          onChange={value => handleEditorChange({ 'html': value })}
          theme='vs-dark' />
      </div>

      <div id="js">
        <Editor
          language='javascript'
          value={js}
          onChange={value => handleEditorChange({ 'js': value })}
          theme='vs-dark' />
      </div>

      <div id="css">
        <Editor
          language='css'
          value={css}
          onChange={value => handleEditorChange({ 'css': value })}
          theme='vs-dark' />
      </div>

      <div id="preview">
        <iframe ref={refIframePreview} title="Preview Editor"></iframe>
      </div>
    </div>
  );
}

export default App;
