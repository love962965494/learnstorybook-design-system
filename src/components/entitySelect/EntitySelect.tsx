import React, { Component, RefObject, createRef } from 'react'
import { Select } from 'antd'

// export interface SelectProps {
//   id: string
//   productName: string,
//   productCode: string
// }

interface GetA {
  <S>(arg: S): void
}
interface Permeation {
  /**
   * 下拉列表key
   */
  nameField: string
  /**
   * 下拉列表数据
   */
  fetchOptions: () => Array<{ [key: string]: string | number }>
  /**
   * 下拉列表value
   */
  valueField: string
  /**
   * 下拉列表placeholder
   */
  placeholder?: string
  /**
   * 联动查询时,变化即更新重新获取数据的字段值
   */
  inputs?: Array<string | number>
  /**
   * 下拉列表选中回调
   */
  onSelect?: <T>(arg: T) => void
  /**
   * 下拉列表选择项变化回调
   */
  onChange?: <T>(arg: T) => void
}
export default class EntitySelect extends Component<Permeation> {
  public isMount: boolean
  public select: RefObject<Select>
  static defautProps = {
    inputs: [],
  }

  constructor(props: Permeation) {
    super(props)
    this.isMount = true
    this.select = createRef()
  }

  state = {
    allOptions: [],
  }

  componentDidUpdate(prevProps: Permeation): void {
    const oldInputs = prevProps.inputs || []
    const newInputs = this.props.inputs || []
    for (let i = 0; i < newInputs.length; i++) {
      if (newInputs[i] !== oldInputs[i]) {
        // 数据有变，重新获取选项
        this.fetchOptions()
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(undefined)
        }
        break
      }
    }
  }

  componentDidMount() {
    this.fetchOptions()
  }

  fetchOptions = async () => {
    const { fetchOptions, valueField } = this.props
    let allOptions = (await fetchOptions()) || []
    if (!this.isMount) {
      return
    }

    // 去掉重复项
    const exitIds = {} as any
    allOptions = allOptions.filter(item => {
      if (!exitIds[item[valueField]]) {
        exitIds[item[valueField]] = true
        return true
      } else {
        return false
      }
    })

    this.setState({
      allOptions: allOptions,
    })
  }

  componentWillUnmount() {
    this.isMount = false
  }

  onTSelect: GetA = value => {
    const { onSelect, valueField } = this.props
    const { allOptions } = this.state
    const item = allOptions.find(i => i[valueField] === value)
    if (onSelect) {
      onSelect(item)
    }
  }

  render() {
    const { nameField, valueField } = this.props
    return (
      <Select
        ref={this.select}
        allowClear
        showSearch
        showArrow
        filterOption={(input, option) =>
          String(option ? option.props.children : '')
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0 ||
          String(option ? option.props.value : '')
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
        style={{ width: '100%' }}
        {...this.props}
        onSelect={this.onTSelect}
      >
        {this.state.allOptions.map(item => {
          return (
            <Select.Option key={item[valueField]} value={item[valueField]}>
              {item[nameField]}
            </Select.Option>
          )
        })}
      </Select>
    )
  }
}
