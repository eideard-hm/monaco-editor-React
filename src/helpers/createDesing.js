export const createDesing = (html, css, js) => {
    return `
    <html>
    <head>
        <style>
        ${css}
        </style>
    </head>
    <body>
        ${html}
        
        <script>
         ${js}
        </script>
    </body>
  </html>
  `
}