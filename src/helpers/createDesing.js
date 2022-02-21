export const createDesing = (html, css, js) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <style>
            ${css}
            </style>
        </head>
        <body>
            ${html}
            
            <script type="module">
            ${js}
            </script>
        </body>
    </html>
  `
}