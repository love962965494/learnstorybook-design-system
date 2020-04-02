import { message } from 'antd'

export type Request<P extends any[], R> = (...args: P) => Promise<R>

export default function withCancel<P extends any[], R>(request: Request<P, R>, isCancel: boolean) {
  return async (...params: P) => {
    try {
      const data = await request(...params)

      if (isCancel) {
        return
      }

      return data
    } catch (err) {
      message.error(err.message || '接口请求出错了，请重试')
    }
  }
}
