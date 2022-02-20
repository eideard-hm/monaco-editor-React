import { encode } from "js-base64";

export const changeUrl = (html, css, js) => {
    const urlHashBase64 = `${encode(html)}|${encode(css)}|${encode(js)}`;
    window.history.replaceState(null, null, `/${urlHashBase64}`);
}
