import loader from '@monaco-editor/loader'
import { ref } from 'vue'

const monacoRef = ref<any>(null)
const monacoLoader = loader.init()

const initMonaco = () => {
  return new Promise<void>((resolve, reject) => {
    if (monacoRef.value) {
      resolve()
      return
    }
    monacoLoader
      .then((monacoInstance) => {
        monacoRef.value = monacoInstance
        resolve()
      })
      .catch((error) => {
        if (error?.type !== 'cancelation') {
          console.error('Monaco initialization error:', error)
          reject()
        }
      })
  })
}

export function useMonacoEditor() {
  return {
    initMonaco,
    monacoRef,
  }
}
