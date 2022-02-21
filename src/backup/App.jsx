/**
 * Backup con las funcionalidades hasta el momento 
 */


import { useRef } from 'react';
import Editor from '@monaco-editor/react'
import IframePreview from './components/IframePreview';
import useHandleState from './hooks/useHandleState';
import debounce from 'lodash.debounce';

const App = () => {
  const refIframePreview = useRef(null);
  const editorRef = useRef(null);

  const runCode = () => {
    debounceTime();
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    const blockContext = "editorTextFocus && !suggestWidgetVisible && !renameInputVisible && !inSnippetMode " +
      "&& !quickFixWidgetVisible";

    editor.addAction({
      id: "executeCurrentAndAdvance",
      label: "Execute Block and Advance",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B],
      contextMenuGroupId: "2_execution",
      precondition: blockContext,
      run: runCode
    });
  }

  const showValue = () => {
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

  const debounceTime = debounce(() => {
    setValueEditor({
      ...valueEditor,
      js: showValue()
    })


    console.log('Cambiando el valor de js');
  }, 500)

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
            wordWrap: "on"
          }} />
      </div>

      <div id="js">
        <Editor
          language='javascript'
          value={js}
          onMount={handleEditorDidMount}
          theme='vs-dark'
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            wordWrap: "on",
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
          }} />
      </div>

      <div id="preview">
        <IframePreview refIframePreview={refIframePreview} />
      </div>
    </div>
  );
}

export default App;
