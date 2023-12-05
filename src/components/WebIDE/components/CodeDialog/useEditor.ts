import { debounce } from 'lodash-es'
import { useMonacoEditor } from '@/hooks/useMonacoEditor'

interface EditorConfig {
  title: string
  key: string
}

const config = [
  { title: 'HTML', key: 'html' },
  { title: 'CSS', key: 'css' },
  { title: 'JAVASCRIPT', key: 'javascript' },
] as EditorConfig[]

const defaultOptions = {
  theme: 'vs-dark',
  wordWrap: 'on',
  minimap: { enabled: false },
  automaticLayout: true,
  contextmenu: false,
  fontSize: 12,
  scrollbar: {
    useShadows: false,
    vertical: 'visible',
    horizontal: 'visible',
    horizontalScrollbarSize: 12,
    verticalScrollbarSize: 12,
  },
}

const { initMonaco, monacoRef } = useMonacoEditor()

interface InitEditorProps {
  codes?: Object
  onChange: Function
}
const initEditor = (props: InitEditorProps) => {
  config.forEach((conf) => {
    const dom = document.querySelector(`#${conf.key}Container`)
    if (dom) {
      const editor = monacoRef.value.editor.create(dom, {
        value: props.codes ? props.codes[conf.key] : '',
        language: conf.key,
        ...defaultOptions,
      })

      editor.onDidChangeModelContent(
        debounce(() => {
          props.onChange(getChangeProps(conf, editor))
        }, 500),
      )
      props.onChange(getChangeProps(conf, editor))
    }
  })
}

function getChangeProps(config, editor) {
  return {
    key: config.key,
    value: editor.getValue(),
  }
}

export function useEditor() {
  return {
    initMonaco,
    initEditor,
    config,
  }
}
