import Mock from 'mockjs'
import { AsideModel, MenuProps } from './Aside'

class Model implements AsideModel {
  public async getMenus() {
    const { menus } = await Mock.mock({
      'menus|1-5': [
        {
          id: '@increment',
          menuName: '@cname',
          'children|0-4': [
            {
              id: '@increment',
              menuName: '@cname',
            },
          ],
        },
      ],
    })
    return menus as MenuProps[]
  }
}

export default new Model()
