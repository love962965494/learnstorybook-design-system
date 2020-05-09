import React from 'react'
import EntitySelect from './EntitySelect'
import getOption from './mock'

export const StandardEntitySelect = () => (
  <EntitySelect nameField="productName" valueField="productCode" fetchOptions={() => getOption()} />
)
