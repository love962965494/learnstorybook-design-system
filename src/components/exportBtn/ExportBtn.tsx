import React, { Component } from 'react'
import { Dropdown, Menu, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
interface Permeation {
  /**
   * 导出文件的地址
   */
  url: string
  /**
   * 导出按钮文字
   */
  text: string
  /**
   * 导出的筛选条件
   */
  searchArgs?: {
    [key: string]: string
  }
}
export default class ExportBtn extends Component<Permeation> {
  static defaultProps = {
    text: '导出文件',
  }
  getStringHref = (fileType: string): string => {
    const { searchArgs } = this.props
    const arr = []
    if (searchArgs) {
      Object.keys(searchArgs).forEach(el => {
        arr.push(searchArgs[el] ? `${el}=${searchArgs[el]}` : null)
      })
    }
    arr.push(`fileType=${fileType}`)
    const string = arr
      .filter(item => {
        return item != null
      })
      .join('&')
    return string
  }
  render() {
    const { url } = this.props
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <a download="报表" href={`${url}?${this.getStringHref('XLS')}`}>
            导出XLS格式
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a download="报表" href={`${url}?${this.getStringHref('CSV')}`}>
            导出CSV格式
          </a>
        </Menu.Item>
        <Menu.Item key="3">
          <a download="报表" href={`${url}?${this.getStringHref('TXT')}`}>
            导出TXT格式
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu}>
        <Button>
          {this.props.text}
          <DownOutlined />
        </Button>
      </Dropdown>
    )
  }
}
