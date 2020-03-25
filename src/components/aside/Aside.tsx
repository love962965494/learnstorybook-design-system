import React, { FC } from 'react'
import { Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import './style/index.less'

const { Sider } = Layout
const { Item: MenuItem, SubMenu } = Menu

interface AsideProps {
  title: string
}

const Aside: FC<AsideProps> = props => {
  const { title } = props

  return (
    <Sider className="neko-aside">
      <div className="logo">{title}</div>
      <Menu theme="dark" mode="inline">
        <MenuItem key="1" title="首页">
          首页
        </MenuItem>
        <MenuItem key="2" title="人员管理">
          人员管理
        </MenuItem>
        <SubMenu key="3" title="系统设置">
          <MenuItem key="31" title="菜单设置">
            菜单设置
          </MenuItem>
          <MenuItem key="32" title="权限设置">
            权限设置
          </MenuItem>
        </SubMenu>
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
}

Aside.defaultProps = {
  title: '',
}
