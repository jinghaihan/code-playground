<template>
  <div ref="containerRef" :class="`${prefixCls}-code-dialog`">
    <div class="code-container" :style="{ height: `${editorContentSize}px` }">
      <template v-for="(editor, index) in editorConfig" :key="editor.key">
        <div
          :class="`editor-resizer ${editor.key}-editor-resizer`"
          @mousedown="(e) => resizeStart(e, index)"
        >
        </div>
        <a-card :title="editor.title" hoverable :style="{ width: `${contentSize[index]}%` }">
          <div :id="`${editor.key}Container`"></div>
        </a-card>
      </template>
    </div>

    <div class="resizer" @mousedown="editorResizeStart"></div>

    <div class="output-container">
      <iframe
        ref="iframeRef"
        class="output-iframe"
        frameBorder="0"
        sandbox="allow-scripts"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
  import { cloneDeep } from 'lodash-es'
  import { ref, toRaw, defineComponent, onMounted } from 'vue'
  import { prefixCls } from '@/settings/designSetting'
  import { CODE_PLAYGROUND_CACHE } from '@/enums/cacheEnums'

  import { useResizable } from './useResizable'
  import { useEditor } from './useEditor'
  import { generatHTML } from './helper'

  export default defineComponent({
    name: 'CodeDialog',
    props: {
      state: {
        type: Object,
        required: true,
      },
    },
    setup() {
      // Resizer
      const containerRef = ref()

      // editor resizer
      const { contentSize, resizeStart } = useResizable({
        getContainer: () => {
          return containerRef.value
        },
        direction: 'horizontal',
        resizeType: 'percent',
        contentSize: [33, 33, 33],
      })
      // output resizer
      const { contentSize: editorContentSize, resizeStart: editorResizeStart } = useResizable({
        getContainer: () => {
          return containerRef.value
        },
        direction: 'vertical',
        resizeType: 'pixel',
        contentSize: 350,
      })

      // Editor
      const { config: editorConfig, initMonaco, initEditor } = useEditor()
      const codes = ref({})
      editorConfig.forEach((config) => {
        codes.value[config.key] = ''
      })

      onMounted(async () => {
        await initMonaco()
        initEditor({ codes: codes.value, onChange: setCodeValue })
      })
      function setCodeValue(data) {
        codes.value[data.key] = data.value
        updateIframeDoc()
      }

      // Output
      const iframeRef = ref()
      function updateIframeDoc() {
        const data = {
          codes: cloneDeep(toRaw(codes.value)),
        }
        iframeRef.value!.srcdoc = generatHTML(data.codes)

        localStorage.setItem(CODE_PLAYGROUND_CACHE, JSON.stringify(data))
      }

      // Cache
      function initCache() {
        try {
          const cache = localStorage.getItem(CODE_PLAYGROUND_CACHE)
          if (cache) {
            const data = JSON.parse(cache)
            if (data.codes) {
              codes.value = data.codes
            }
            updateIframeDoc()
          }
        } catch (error) {}
      }
      initCache()

      return {
        prefixCls,
        containerRef,
        contentSize,
        editorContentSize,
        editorConfig,
        iframeRef,

        resizeStart,
        editorResizeStart,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-code-dialog';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .code-container {
      background-color: @background-color;
      height: 350px;
      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: space-between;

      :deep(.@{ant-prefix}-card) {
        height: 100%;

        &-head {
          min-height: 0;
          height: 40px;
          user-select: none;
        }

        &-body {
          height: calc(~'100% - 40px');
          padding: 0;

          > div {
            height: 100%;
          }
        }
      }

      .editor-resizer {
        background-color: @background-darker-color;
        cursor: col-resize;
        z-index: 10;
        height: 100%;
        width: 14px;
      }
    }

    .resizer {
      background-color: @background-darker-color;
      cursor: row-resize;
      z-index: 10;
      height: 18px;
      width: 100%;
    }

    .output-container {
      background-color: #fff;
      width: 100%;
      flex-grow: 1;

      .output-iframe {
        min-height: 100%;
        min-width: 100%;
      }
    }
  }
</style>
