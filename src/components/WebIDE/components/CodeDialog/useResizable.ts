import { isArray, isNumber } from 'lodash-es'
import { ref } from 'vue'

interface UseResizableProps {
  getContainer: Function
  direction: 'vertical' | 'horizontal'
  resizeType: 'percent' | 'pixel'
  contentSize: number | number[]
}

export function useResizable(props: UseResizableProps) {
  const variable = {
    isResizing: true,
    order: 0,
    start: { x: 0, y: 0 },
  }

  const contentSize = ref(props.contentSize)

  const resize = (event) => {
    if (!variable.isResizing) return

    let diff = 0
    let diffPer = 0
    if (props.direction === 'vertical') {
      // vertical resize
      diff = event.clientY - variable.start.y
      variable.start.y = event.clientY

      diffPer = (diff / props.getContainer().offsetHeight) * 100
    } else {
      // horizontal resize
      diff = event.clientX - variable.start.x
      variable.start.x = event.clientX

      diffPer = (diff / props.getContainer().offsetWidth) * 100
    }

    // precent resize type
    if (props.resizeType === 'percent') {
      // Array
      if (isArray(contentSize.value) && variable.order) {
        contentSize.value[variable.order - 1] += diffPer
        contentSize.value[variable.order] -= diffPer
      }
    }

    // pixel resize type
    if (props.resizeType === 'pixel') {
      // Array
      if (isArray(contentSize.value) && variable.order) {
        contentSize.value[variable.order - 1] += diff
        contentSize.value[variable.order] -= diff
      }

      // Pixel
      if (isNumber(contentSize.value)) {
        contentSize.value += diff
      }
    }
  }

  const resizeStop = () => {
    if (variable.isResizing) {
      variable.isResizing = false
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', resizeStop)
    }
  }

  const resizeStart = (event, index) => {
    variable.isResizing = true
    variable.start.x = event.clientX
    variable.start.y = event.clientY
    variable.order = index

    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', resizeStop)
  }

  return { contentSize, resizeStart, resizeStop }
}
