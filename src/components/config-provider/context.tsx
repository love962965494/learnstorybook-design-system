import React from 'react'

export const ConfigContext = React.createContext({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    return customizePrefixCls || `neco-${suffixCls}`
  },
})

export type ConfigContextProps = typeof ConfigContext
