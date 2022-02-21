import { useRef } from 'react';
import Editor from '@monaco-editor/react'
import IframePreview from './components/IframePreview';
import useHandleState from './hooks/useHandleState';
import debounce from 'lodash.debounce';
import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es'

const App = () => {
  const refIframePreview = useRef(null);
  const editorRef = useRef(null);

  const { valueEditor, setValueEditor } = useHandleState(
    { html: '', css: '', js: '' },
    refIframePreview
  );
  const { html, css, js } = valueEditor;

  const handleEditorChange = (value) => {
    setValueEditor({
      ...valueEditor,
      ...value
    })
  }

  const debounceTime = debounce((value) => {
    setValueEditor({
      ...valueEditor,
      ...value
    })
  }, 1000)

  // editor 
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    const dispose = emmetHTML(monaco);
    const disposeCss = emmetCSS(monaco);
    const disposeJS = emmetJSX(monaco);
    dispose();
    disposeCss();
    disposeJS();
  }

  return (
    <div className='editor'>

      <div id="html">
        <Editor
          language='html'
          value={html}
          onChange={value => handleEditorChange({ 'html': value })}
          theme='vs-dark'
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            wordWrap: "on",
            fontFamily: 'Cascadia Code PL',
            fontLigatures: true
          }} />
      </div>

      <div id="js">
        <Editor
          language='javascript'
          value={js}
          onChange={value => debounceTime({ 'js': value })}
          onMount={handleEditorDidMount}
          theme='vs-dark'
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            wordWrap: "on",
            fontFamily: 'Cascadia Code PL',
            fontLigatures: true
          }} />
      </div>

      <div id="css">
        <Editor
          language='css'
          value={css}
          onChange={value => handleEditorChange({ 'css': value })}
          theme='vs-dark'
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            wordWrap: "on",
            fontFamily: 'Cascadia Code PL',
            fontLigatures: true
          }} />
      </div>

      <div id="preview">
        <IframePreview refIframePreview={refIframePreview} />
      </div>
    </div>
  );
}

export default App;
