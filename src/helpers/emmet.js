import { emmetHTML, emmetCSS, emmetJSX, expandAbbreviation } from 'emmet-monaco-es'

const emmet = (monaco) => {
    // `emmetHTML` , `emmetCSS` and `emmetJSX` are used the same way
    const dispose = emmetHTML(
        // monaco-editor it self. If not provided, will use window.monaco instead.
        // This could make the plugin support both ESM and AMD loaded monaco-editor
        monaco,
        // languages needs to support html markup emmet, should be lower case.
        ['html', 'php'],
    )

    // run it if you want to dispose emmetHTML.
    // NOTE: all languages specified will be disposed.
    dispose()

    // internal expand API, if you want to extend functionality with emmet
    // check out the emmet repo https://github.com/emmetio/emmet for how to use it
    expandAbbreviation('a', { type: 'markup', syntax: 'html' }) // <a href=""></a>
    expandAbbreviation('fz14', { type: 'stylesheet', syntax: 'css' }) // font-size: 14px;
}

export default emmet