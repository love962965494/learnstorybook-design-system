import React from 'react'
import { Button as AntdButton } from 'antd'
import { ButtonProps as AntdButtonProps } from 'antd/lib/button'
import './style/test.less'
// import './test.scss'
import PropTypes from 'prop-types'

type ButtonProps = AntdButtonProps & {
  /**
   * 测试使用
   */
  test?: string
}

export default function Button(props: ButtonProps) {
  return (
    <AntdButton {...props} className="test">
      {props.children + ' ' + (props.test || '')}
    </AntdButton>
  )
}

Button.propTypes = {
  /**
   * 按钮的类型， 可选值为 'primary' | 'danger' | 'dashed' ...
   */
  type: PropTypes.string,
  /**
   * 测试使用
   */
  test: PropTypes.string
}

Button.defaultProps = {
  type: 'primary'
}