<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 国际化
import { ElConfigProvider } from 'element-plus/lib/components'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import { ElButton } from 'element-plus'
// defineComponent 类型限制和类型推导
export default defineComponent({
  name: 'App',
  components: {
    // ElButton
    ElConfigProvider
  },
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
