import { useEffect, useState } from "react";
import { decode } from "js-base64";
import { changeUrl } from "../helpers/changeUrl";
import { createDesing } from "../helpers/createDesing";

const useHandleState = (initialState, refIframePreview) => {
    const [valueEditor, setValueEditor] = useState(initialState);
    const { html, css, js } = valueEditor;

    useEffect(() => {
        const { pathname } = window.location;

        if (!pathname.slice(1)) return;
        const [html, css, js] = pathname.slice(1).split('%7C');

        setValueEditor({
            'html': html ? decode(html) : '',
            'css': css ? decode(css) : '',
            'js': js ? decode(js) : ''
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