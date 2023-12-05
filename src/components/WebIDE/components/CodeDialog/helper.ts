export function generatHTML(payload) {
  return `
    <html>
      <head>
          <style id="_style">${payload.css}</style>
          <script type="module" id="_script">
              ${payload.javascript}
          </\script>
      </head>
      <body>
          ${payload.html}
      </body>
    </html>
  `
}
