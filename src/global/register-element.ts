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
  ElTabPane,
  ElTabs,
  ElIcon,
  ElSubMenu
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
  ElTabPane,
  ElTabs,
  ElIcon,
  ElSubMenu
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
