import { useEffect, useState } from "react";
import { decode } from "js-base64";
import { changeUrl } from "../helpers/changeUrl";
import { createDesing } from "../helpers/createDesing";

const useHandleState = (initialState, refIframePreview) => {
    const [valueEditor, setValueEditor] = useState(initialState);
    const { html, css, js } = valueEditor;

    useEffect(() => {
        const { pathname } = window.location;
        
        const [html, css, js] = pathname.slice(1).split('%7C');

        setValueEditor({
            'html': (html && html.length !== 0) ? decode(html) : '',
            'css': (css && css.length !== 0) ? decode(css) : '',
            'js': (js && js.length !== 0) ? decode(js) : ''
        })
    }, [])

    useEffect(() => {
        changeUrl(html, css, js);
        refIframePreview.current.setAttribute('srcDoc', createDesing(html, css, js))
    }, [html, css, js, refIframePreview])

    return {
        valueEditor,
        setValueEditor
    }
}

export default useHandleState