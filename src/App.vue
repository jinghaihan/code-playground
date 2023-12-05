<template>
  <a-config-provider
    :prefixCls="prefixCls"
    :locale="zhCN"
    :theme="{
      algorithm: theme.darkAlgorithm,
      token: { colorPrimary: primaryColor, borderRadius: 0 },
    }"
  >
    <WebIDE />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { theme } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import WebIDE from '@/components/WebIDE'

  import { prefixCls, primaryColor } from '@/settings/designSetting'
</script>

<style></style>
