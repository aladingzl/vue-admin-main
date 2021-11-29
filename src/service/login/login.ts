import myRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'
// 可能会有多个URL 方便以后更改 使用枚举类型
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  // 用法：role/1/menu
  UserMenus = '/role/'
}
// '@typescript-eslint/explicit-module-boundary-types': 'off' 自行类型推导
export function accountLoginRequest(account: IAccount) {
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuByRoleId(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
