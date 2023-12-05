import type { App, Plugin } from 'vue'
import { v4 } from 'uuid'

export function uuid(): string {
  return v4()
}

export function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve(text) : reject()
      textArea.remove()
    })
  }
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    // @ts-ignore
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
