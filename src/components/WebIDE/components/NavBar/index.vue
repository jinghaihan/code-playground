<template>
  <div :class="`${prefixCls}-nav-bar`">
    <div class="detail-container">
      <LogoWidget />
    </div>

    <div class="action-container"> </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { prefixCls } from '@/settings/designSetting'

  import LogoWidget from './LogoWidget.vue'

  export default defineComponent({
    name: 'NavBar',
    components: { LogoWidget },
    props: {
      state: {
        type: Object,
        required: true,
      },
      changeState: {
        type: Function,
        required: true,
      },
    },
    setup() {
      return { prefixCls }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-nav-bar';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      min-width: 45px;
      height: 100%;
    }
  }
</style>
