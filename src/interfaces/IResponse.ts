export interface IResponse<T> {
  info: IResponseInfo
  results: T[]
}

export interface IResponseInfo {
  seed: string
  results: number
  page: number
  version: string
}
