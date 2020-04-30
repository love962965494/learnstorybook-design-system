import React, { useState, ReactNode } from 'react'
import { Layout, Menu } from 'antd'
import { useCancel } from '../_hooks'
import { MailOutlined } from '@ant-design/icons'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import useClasses from '../_hooks/useClasses'

const { Sider } = Layout
const { Item: MenuItem, SubMenu } = Menu

interface AsideProps {
  /**
   * 项目标题
   */
  title: string
  /**
   * 用户自定义样式名
   */
  className?: string
  /**
   * 侧边栏是否收缩
   */
  collapsed?: boolean
  /**
   * 处理侧边栏响应式事件
   */
  // onBreakPoint: (broken: boolean) => void
  /**
   * 侧边栏相关model
   */
  model: AsideModel
}

export interface MenuProps {
  id: string
  path: string
  menuName: string
  icon: ReactNode
  children: MenuProps[]
}

export interface AsideModel {
  getMenus(): Promise<MenuProps[]>
}

export default function Aside(props: AsideProps) {
  const {
    title,
    className = '',
    collapsed = false,
    // onBreakPoint,
    model: { getMenus },
  } = props
  const [menus, setMenus] = useState<MenuProps[]>([])

  const { prefixCls, classes } = useClasses('aside', className)

  useCancel(getMenus, menus => {
    setMenus(menus)
  })

  const renderMenus = (menus: MenuProps[], isParent = true) => {
    return menus.map(menu => {
      const Icon = (menu.icon || MailOutlined) as React.ComponentClass

      if (menu.children && menu.children.length > 0) {
        return (
          <SubMenu
            key={menu.id}
            title={
              <Link to={menu.path} style={{ color: '#fff' }}>
                {isParent && <Icon />}
                {collapsed ? null : menu.menuName}
              </Link>
            }
          >
            {renderMenus(menu.children, false)}
          </SubMenu>
        )
      } else {
        return (
          <MenuItem key={menu.id}>
            <Link to={menu.path} style={{ color: '#fff' }}>
              {isParent && <Icon />}
              {isParent && collapsed ? null : menu.menuName}
            </Link>
          </MenuItem>
        )
      }
    })
  }

  return (
    <Sider
      width="256"
      collapsible
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      className={classes}
      collapsed={collapsed}
      // onBreakpoint={onBreakPoint}
    >
      <div className={`${prefixCls}-logo`}>
        <img src={logo} alt={title} />
        {!collapsed && <span>{title}</span>}
      </div>
      <Menu theme="dark" mode="inline">
        {renderMenus(menus)}
      </Menu>
    </Sider>
  )
}
