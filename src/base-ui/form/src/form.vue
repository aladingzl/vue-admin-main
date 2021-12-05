<template>
  <!-- 在原user.vue中写下列代码显得很臃肿，抽取出来成为一个组件 -->
  <!-- 传过来一个配置，根据配置进行搭建，数据利用动态传值
      此后其它界面想要使用直接传配置就行
   -->
  <!--
    1. 提前预设好表单内 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件  基本布局搭建
    2. 根据传过来的配置 遍历 进行相应的操作 包括用户输入组件的一些调整 动态传值（父子组件传值方式） 双向绑定（双向绑定实现原理）
    3. 表单组件样式的动态调整 根据屏幕动态调整 layout


   -->
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <!-- 动态决定labelWidth -->
    <el-form :label-width="labelWidth">
      <!-- row 行 -->
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- col 列 -->
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- imput -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <!-- select -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- datepicker -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IFormItem } from '../types'
/**
 * 单向数据流
 * 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
 * 这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。
 * 另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。
 * 这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。
 */

/**
 * 注意 prop 会在一个组件实例创建之前进行验证，
 * 所以实例的 property (如 data、computed 等) 在 default 或 validator 函数中是不可用的。
 */

/**
 * 注意在 JavaScript 中对象和数组是通过引用传入的，
 * 所以对于一个数组或对象类型的 prop 来说，
 * 在子组件中改变这个对象或数组本身将会影响到父组件的状态。
 */

export default defineComponent({
  props: {
    // 双向绑定默认传的
    modelValue: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    formItems: {
      // 这种类型的数组 IFormItem
      // Vue 对定义了 type 的 prop 执行运行时验证。
      // 要将这些类型提供给 TypeScript，我们需要使用 PropType 指明构造函数：
      type: Array as PropType<IFormItem[]>,
      // 请务必使用箭头函数 ？
      default: () => []
    },
    colLayout: {
      type: Object,
      // 响应式
      // xs	<768px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
      // sm	≥768px 响应式栅格数或者栅格属性对象	number/object (例如 {span: 4, offset: 4})	—	—
      // md	≥992px 响应式栅格数或者栅格属性对象	number/object (例如 {span: 4, offset: 4})	—	—
      // lg	≥1200px 响应式栅格数或者栅格属性对象	number/object (例如 {span: 4, offset: 4})	—	—
      // xl	≥1920px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
      default: () => ({
        xl: 6, // >1920px 24/6 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = computed({
    //   get: () => props.modelValue,
    //   set: () => {
    //     console.log('--------')
    //     emit('update:modelValue', newValue)
    //   }
    // })

    // 拷贝了一份
    const formData = ref({ ...props.modelValue })
    // const formData = computed(() => ({ ...props.modelValue }))
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
