import withCancel, { Request } from '../_utils/withCancel'
import { useState, useEffect } from 'react'

export type RequestCallback<R> = (res: R) => void

export default function useCancel<P extends any[], R>(
  request: Request<P, R>,
  callback: RequestCallback<R>,
  beforeRequest?: () => void
) {
  const [isCancel, setIsCancel] = useState(false)

  const requestWithCancel = withCancel(request, isCancel)

  const getData = async (...params: P) => {
    if (beforeRequest) {
      beforeRequest()
    }

    const res = await requestWithCancel(...params)

    if (res) {
      callback(res)
    }
  }

  useEffect(() => {
    setIsCancel(false)

    getData.apply(null)

    return () => setIsCancel(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return getData
}
