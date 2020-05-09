import React, { useState, ReactNode } from 'react'
import ProLayout, { MenuDataItem, BasicLayoutProps } from '@ant-design/pro-layout'
import useClasses from '../_hooks/useClasses'
import logo from '../../assets/logo.png'
import { useCancel } from '../_hooks'
import { Link } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'

export interface MenuItemProps {
  id: number
  dataLimit: string | null
  /**
   * 显示隐藏0隐藏，1显示
   */
  indexFlag: number
  /**
   * 匹配模式,0:等值,1:正则
   */
  matchType: number
  /**
   * 菜单图标
   */
  menuIcon: string
  /**
   * 菜单名称
   */
  menuName: string
  /**
   * 菜单类型
   */
  menuType: string
  /**
   * 菜单URI
   */
  menuUri: string
  parentId: number
  /**
   * 排序值
   */
  sortValue: number
}

export interface LayoutProps {
  /**
   * 项目标题
   */
  title: string
  /**
   * 用户自定义样式名
   */
  className?: string
  /**
   * 组件需要的model
   */
  model: LayoutModel
  children?: ReactNode[]
}

export interface LayoutModel {
  /**
   * 获取菜单数据的方法
   */
  getMenus: () => Promise<MenuItemProps[]>
}

function format(menus: MenuItemProps[]): MenuDataItem[] {
  const rootId = menus.find(menu => menu.parentId === 0)?.id

  const menuDataArray: Array<MenuDataItem & { parentId: number; children: MenuDataItem[] }> = [...menus]
    .filter(menu => menu.parentId !== 0)
    .map(menu => {
      const menuDataItem = {
        id: menu.id,
        parentId: menu.parentId,
        path: menu.menuUri,
        name: menu.menuName,
        children: [],
      }

      return menuDataItem
    })

  const formatMenus = []

  for (const menu of menuDataArray) {
    if (menu.parentId === rootId) {
      formatMenus.push(menu)
      continue
    }
  }

  for (const menu of menuDataArray) {
    const parentMenu = formatMenus.find(item => item.id === menu.parentId)

    parentMenu?.children.push(menu)
  }

  return formatMenus
}

export default function Layout(props: LayoutProps) {
  const {
    title,
    className = '',
    model: { getMenus },
  } = props
  const [collapsed, setCollapsed] = useState(false)
  const [test, setTest] = useState('')
  const [menus, setMenus] = useState<MenuDataItem[]>([])
  const { classes } = useClasses('layout', className)

  const handleCollapsed = () => setCollapsed(!collapsed)

  const menuItemRender: BasicLayoutProps['menuItemRender'] = ({ icon, path, name, parentKeys }) => {
    const Icon = (icon || MailOutlined) as React.ComponentClass

    return parentKeys && parentKeys.length > 1 ? (
      <Link to={path || ''} onClick={() => setTest(path || '')}>
        {name}
      </Link>
    ) : (
      <Link to={path || ''} onClick={() => setTest(path || '')}>
        <Icon /> {collapsed ? null : name}
      </Link>
    )
  }

  const subMenuItemRender: BasicLayoutProps['subMenuItemRender'] = ({ icon, name }) => {
    const Icon = (icon || MailOutlined) as React.ComponentClass

    return (
      <span>
        <Icon />
        {collapsed ? null : name}
      </span>
    )
  }

  useCancel(getMenus, menus => setMenus(format(menus)))

  return (
    <ProLayout
      logo={logo}
      title={title}
      className={classes}
      collapsed={collapsed}
      menuDataRender={() => menus}
      onCollapse={handleCollapsed}
      menuItemRender={menuItemRender}
      subMenuItemRender={subMenuItemRender}
      location={{
        pathname: test,
      }}
    >
      {props.children}
    </ProLayout>
  )
}
