import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import { useCancel } from '../_hooks'

const { Sider } = Layout
const { Item: MenuItem, SubMenu } = Menu

interface AsideProps {
  title: string
  model: AsideModel
}

export interface MenuProps {
  id: string
  menuName: string
  children: MenuProps[]
}

export class AsideModel {}
export interface AsideModel {
  getMenus(): Promise<MenuProps[]>
}

const Aside: FC<AsideProps> = props => {
  const {
    title,
    model: { getMenus },
  } = props
  const [menus, setMenus] = useState<MenuProps[]>([])

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
    <Sider className="neco-aside">
      <div className="logo">{title}</div>
      <Menu theme="dark" mode="inline">
        {renderMenus(menus)}
      </Menu>
    </Sider>
  )
}

export default Aside

Aside.propTypes = {
  /**
   * 项目标题
   */
  title: PropTypes.string.isRequired,
  /**
   * 业务处理相关model
   */
  model: PropTypes.instanceOf(AsideModel).isRequired,
}

Aside.defaultProps = {
  title: '',
}
