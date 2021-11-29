<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
// login 细分组件 各个小部分处理不同的逻辑 更加清晰
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
// defineComponent
export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
