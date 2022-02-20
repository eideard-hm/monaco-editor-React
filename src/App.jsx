import { useRef } from 'react';
import Editor from '@monaco-editor/react'
import IframePreview from './components/IframePreview';
import useHandleState from './hooks/useHandleState';
// import { useHotkeys } from 'react-hotkeys-hook';
import debounce from 'lodash.debounce';

function App() {
  const refIframePreview = useRef(null);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  function showValue() {
    return editorRef.current.getValue();
  }

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


  const debounceTime = debounce((keyPress) => {
    if (keyPress === 17) {
      setValueEditor({
        ...valueEditor,
        'js': showValue()
      })
    }
  }, 500)

  const handleKeyDown = (e) => {
    console.log('SE EJECUTO EL EVENTO');
    debounceTime(e.keyCode);
  }

  return (
    <div className='editor'>

      <div id="html">
        <Editor
          language='html'
          value={html}
          onChange={value => handleEditorChange({ 'html': value })}
          theme='vs-dark'
          className=''
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            cursorStyle: "block",
            // wordWrap: "on",
          }} />
      </div>

      <div id="js" onKeyDown={handleKeyDown}>
        <Editor
          language='javascript'
          value={js}
          onMount={handleEditorDidMount}
          // onChange={value => handleEditorChange({ 'js': value })}
          theme='vs-dark'
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            cursorStyle: "block",
            wordWrap: "on",
          }} />
      </div>

      <div id="css">
        <Editor
          language='css'
          value={css}
          onChange={value => handleEditorChange({ 'css': value })}
          theme='vs-dark'
          className=''
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            cursorStyle: "block",
            wordWrap: "on",
          }} />
      </div>

      <div id="preview">
        <IframePreview refIframePreview={refIframePreview} />
      </div>
    </div>
  );
}

export default App;
