import { encode } from "js-base64";

export const changeUrl = (html, css, js) => {
    if (html === '' && css === '' && js === '') {
        window.history.replaceState(null, null, '/');
    } else {
        const urlHashBase64 = `${encode(html)}|${encode(css)}|${encode(js)}`;
        window.history.replaceState(null, null, `/${urlHashBase64}`);
    }
}
