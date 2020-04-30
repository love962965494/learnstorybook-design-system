import Mock from 'mockjs'
import { MenuDataItem } from '@ant-design/pro-layout'
import { LayoutModel, MenuItemProps } from './Layout'

class Model implements LayoutModel {
  // public async getMenus() {
  //   const { menus } = (await Mock.mock({
  //     'menus|1-5': [
  //       {
  //         id: '@increment',
  //         path: /\/[a-z][A-Z][0-9]/,
  //         name: '@cname',
  //         'children|1-4': [
  //           {
  //             id: '@increment',
  //             path: /\/[a-z][A-Z][0-9]/,
  //             name: '@cname',
  //             // children: [],
  //           },
  //         ],
  //       },
  //     ],
  //   })) as { menus: MenuDataItem[] }

  //   return menus.map(menu => {
  //     if (menu.children) {
  //       for (const child of menu.children) {
  //         child.path = menu.path! + child.path
  //       }
  //     }

  //     return menu
  //   })
  // }

  public async getMenus() {
    const root: MenuItemProps = {
      dataLimit: null,
      id: 3695,
      indexFlag: 1,
      matchType: 0,
      menuIcon: 'test',
      menuName: '标准版网贷后管',
      menuType: '1',
      menuUri: '/',
      parentId: 0,
      sortValue: 0,
    }

    const { menus } = (await Mock.mock({
      'menus|10': [
        {
          id: '@increment',
          dataLimit: '',
          menuIcon: '',
          menuName: '@cname',
          menuType: /[0-3]/,
          menuUri: /\/[a-z]{3,}/,
          parentId: function (this: MenuItemProps) {
            this.id = (this.id % 10) + 1

            if (this.id <= 3) {
              return root.id
            }

            return (this.id % 3) + 1
          },
          sortValue: '@integer(1, 5)',
        },
      ],
    })) as { menus: MenuItemProps[] }

    for (const menu of menus) {
      const parentMenu = menus.find(item => item.id === menu.parentId)

      if (parentMenu) {
        menu.menuUri = parentMenu.menuUri + menu.menuUri
      }
    }

    return [root, ...menus]
  }
}

export default new Model()
