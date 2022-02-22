import { encode } from "js-base64";

export const changeUrl = (html, css, js) => {
    const urlHashBase64 = `${encode(html)}|${encode(css)}|${encode(js)}`;
    console.log(urlHashBase64)
    window.history.replaceState(null, null, `/${urlHashBase64}`);
}
