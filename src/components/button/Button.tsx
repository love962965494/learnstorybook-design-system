import React, { FC } from 'react'
import { Button as AntdButton } from 'antd'
import { ButtonProps as AntdButtonProps } from 'antd/lib/button'
import PropTypes from 'prop-types'

type ButtonProps = AntdButtonProps & {
  /**
   * 测试使用
   */
  test?: string
}

const Button: FC<ButtonProps> = props => {
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
  type: PropTypes.oneOf(['ghost', 'danger', 'link', 'default', 'primary', 'dashed']),
  /**
   * 测试使用
   */
  test: PropTypes.string,
}

Button.defaultProps = {
  type: 'primary',
}

export default Button
