export interface ILoginRequestData {
  /** admin 或 editor */
  username: string;
  /** 密码 */
  password: string;
}

export type LoginResponseData = IApiResponseData<{ token: string ,authority:string}>;
