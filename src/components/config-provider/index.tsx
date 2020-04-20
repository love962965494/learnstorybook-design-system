import React, { FC } from 'react'
import { ConfigContext } from './context'

export { ConfigContext }

export interface ConfigProviderProps {
  prefixCls?: string
}

const ConfigProvider: FC<ConfigProviderProps> = props => {
  const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = 'neco' } = props

    if (customizePrefixCls) {
      return customizePrefixCls
    }

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls
  }

  const config = {
    getPrefixCls,
  }

  return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>
}

export default ConfigProvider
