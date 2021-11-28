<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { ElButton } from 'element-plus'
// defineComponent 类型限制和类型推导
export default defineComponent({
  name: 'App',
  components: {
    // ElButton
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
