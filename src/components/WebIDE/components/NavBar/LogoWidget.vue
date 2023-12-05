<template>
  <div :class="`${prefixCls}-LogoWidget`">
    <Icon class="logo" type="svg-logo" />
    <div class="title">Code - Playground</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { prefixCls } from '@/settings/designSetting'

  export default defineComponent({
    name: 'LogoWidget',
    setup() {
      return {
        prefixCls,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-LogoWidget';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      width: 45px;
      font-size: 36px;
      color: @cyan-color;
    }

    .title {
      color: @foreground-color;
      font-size: 20px;
      font-weight: 700;
      margin-left: 0.6rem;
    }
  }
</style>
