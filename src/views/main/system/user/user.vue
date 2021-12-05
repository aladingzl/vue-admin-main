<template>
  <!-- 四层
       页面层、页面组件层、baseui、vuex
       没有什么是分层不能解决的、有那就再分一层
   -->
  <!-- User.vue => PageContent => MyTable 分三层 -->
  <!-- 没抽取 PageContent 之前，网络请求都是在 user 这里做的，后面添加其它页面 user1 user2 。。。
       还是有网络请求部分，而且此部分的代码有较高的重复性，因此把相关逻辑放进 PageContent 中
       这里只需要传一个 pageName 即可

       BFF ？ serverless ？
   -->
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

// 两个配置文件
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
