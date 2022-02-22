import { useEffect, useState } from "react";
import { decode } from "js-base64";
import { changeUrl } from "../helpers/changeUrl";
import { createDesing } from "../helpers/createDesing";

const useHandleState = (initialState, refIframePreview) => {
    const [valueEditor, setValueEditor] = useState(initialState);
    const { html, css, js } = valueEditor;

    useEffect(() => {
        const { pathname } = window.location;

        const [htmlRaw, cssRaw, jsRaw] = pathname.slice(1).split('%7C');

        setValueEditor({
            'html': htmlRaw ? decode(htmlRaw) : '',
            'css': cssRaw ? decode(cssRaw) : '',
            'js': jsRaw ? decode(jsRaw) : ''
        })
    }, [])

    useEffect(() => {
        changeUrl(html, css, js);
        refIframePreview.current.setAttribute('srcDoc', createDesing(html, css, js));
        console.log({ html, css, js })
    }, [html, css, js, refIframePreview])

    return {
        valueEditor,
        setValueEditor
    }
}

export default useHandleState