<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// reactive 与 ref
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus/lib/components'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    // 处理登录逻辑
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid: any) => {
        if (valid) {
          // 1.判断是否要记住密码

          if (isKeepPassword) {
            // console.log(111)
            // 其它缓存方式
            // 本地缓存 sessionStorage / localStorage辨析
            // 考虑进行加密
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          }
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }
        // 2.开始进行登录验证
        store.dispatch('login/accountLoginAction', { ...account })
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
