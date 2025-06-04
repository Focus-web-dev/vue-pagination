export interface IUser {
  id: IUserID
  name: IUserName
  email: string
  phone: string
}

export interface IUserID {
  name: string
  value: string
}

export interface IUserName {
  title: string
  first: string
  last: string
}
