import myRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'
// 可能会有多个URL 方便以后更改 使用枚举类型
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/'
}
// '@typescript-eslint/explicit-module-boundary-types': 'off' 自行类型推导
export function accountLoginRequest(account: IAccount) {
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
