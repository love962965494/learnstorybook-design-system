import Mock from 'mockjs'
// import { SelectProps } from './EntitySelect'

const getOption = () => {
  const OptionList = Mock.mock([
    {
      productName: '@cname',
      productCode: '@cname',
    },
    {
      productName: '@cname',
      productCode: '@cname',
    },
  ])
  return OptionList
}

export default getOption
