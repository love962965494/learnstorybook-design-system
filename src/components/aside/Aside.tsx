import React, { FC, useState, useContext } from 'react'
import { Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import { useCancel } from '../_hooks'
import { ConfigContext } from '../config-provider'
import classNames from 'classnames'

const { Sider } = Layout
const { Item: MenuItem, SubMenu } = Menu

interface AsideProps {
  logo?: string
  title: string
  className?: string
  model: AsideModel
}

export interface MenuProps {
  id: string
  menuName: string
  children: MenuProps[]
}

export interface AsideModel {
  getMenus(): Promise<MenuProps[]>
}

const Aside: FC<AsideProps> = props => {
  const {
    logo,
    title,
    model: { getMenus },
    className,
  } = props
  const [menus, setMenus] = useState<MenuProps[]>([])

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls('aside')

  const classes = classNames(prefixCls, className)

  useCancel(getMenus, menus => {
    setMenus(menus)
  })

  const renderMenus = (menus: MenuProps[]) => {
    return menus.map(menu => {
      if (menu.children && menu.children.length > 0) {
        return (
          <SubMenu key={menu.id} title={menu.menuName}>
            {renderMenus(menu.children)}
          </SubMenu>
        )
      } else {
        return <MenuItem key={menu.id}>{menu.menuName}</MenuItem>
      }
    })
  }

  return (
    <Sider className={classes}>
      <div className={`${prefixCls}-logo`}>
        <a href="/">
          <img src={logo} alt={title} />
          <h1>{title}</h1>
        </a>
      </div>
      <Menu theme="dark" mode="inline">
        {renderMenus(menus)}
      </Menu>
    </Sider>
  )
}

export default Aside

Aside.propTypes = {
  /**
   * 项目logo
   */
  logo: PropTypes.string,
  /**
   * 项目标题
   */
  title: PropTypes.string.isRequired,
  /**
   * 自定义class-name
   */
  className: PropTypes.string,
  /**
   * 业务处理相关model
   */
  model: PropTypes.any.isRequired,
}

Aside.defaultProps = {
  title: '',
}
