import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElRadio
} from 'element-plus/lib/components'
const components = [ElButton, ElForm, ElFormItem, ElRadio]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
