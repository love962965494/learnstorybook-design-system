import { useContext } from 'react'
import { ConfigContext } from '../config-provider'
import classNames from 'classnames'

export default function useClasses(componentName: string, ...classnames: string[]) {
  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls(componentName)
  const classes = classNames(prefixCls, ...classnames)

  return { prefixCls, classes }
}
