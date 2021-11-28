import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElRadio,
  // ElSubmenu,
  ElTabPane,
  ElTabs,
  ElIcon
} from 'element-plus/lib/components'
const components = [
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElRadio,
  // ElSubmenu,
  ElTabPane,
  ElTabs,
  ElIcon
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
