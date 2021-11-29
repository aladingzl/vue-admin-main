<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- v-model="currentTab"是element-plus提供的属性 -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- Tab-pane Attributes  name: 与选项卡绑定值 value 对应的标识符，表示选项卡别名 -->
      <el-tab-pane name="account">
        <template #label>
          <span
            ><el-icon><user-filled /></el-icon> 账号登录</span
          >
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span
            ><el-icon><iphone /></el-icon> 手机登录</span
          >
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Iphone, UserFilled } from '@element-plus/icons'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    Iphone,
    UserFilled,
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    // 记住密码与否
    const isKeepPassword = ref(true)
    // 拿到 LoginAccount 的类型，进行类型限制 获取某个组件对应的类型
    // 拿到 LoginAccount 组件
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    // 拿到 LoginPhone 组件
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    // 点击立即登录，区分是哪一个tab
    const currentTab = ref<string>('account')
    // 2.定义方法
    // 登录的逻辑 （网络请求，拿到数据后的处理）
    // 数据保存到某一个地方 保存到 vuex 里比较合适  数据共享  vuex 五大核心
    // 发送其它请求
    // 拿到用户菜单
    // 跳转到首页
    // 用户权限的管理（重要）
    const handleLoginClick = () => {
      // console.log(accountRef.value)
      // 根据值的不同
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneLogin')
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
