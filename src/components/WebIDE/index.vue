<template>
  <a-layout :class="`${prefixCls}`">
    <a-layout-header :class="`${prefixCls}-header`">
      <NavBar :state="changeState" :changeState="changeState" />
    </a-layout-header>

    <a-layout-content :class="`${prefixCls}-content`">
      <CodeDialog :state="state" />
    </a-layout-content>

    <a-layout-footer :class="`${prefixCls}-footer`" />
  </a-layout>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { prefixCls } from '@/settings/designSetting'

  import NavBar from './components/NavBar/index.vue'
  import CodeDialog from './components/CodeDialog/index.vue'

  export default defineComponent({
    name: 'CodePencil',
    components: { CodeDialog, NavBar },
    setup() {
      const state = ref({
        layout: 'top',
      })
      function changeState(value) {
        state.value = {
          ...state.value,
          ...value,
        }
      }

      return {
        prefixCls,
        state,
        changeState,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}';

  .@{prefix-cls} {
    &-header {
      height: 45px;
      background-color: @background-darker-color;
      padding: 0;
    }

    &-content {
      height: calc(~'100vh - 45px - 30px');
    }

    &-footer {
      height: 30px;
      background-color: @background-darker-color;
      padding: 0;
    }
  }
</style>
