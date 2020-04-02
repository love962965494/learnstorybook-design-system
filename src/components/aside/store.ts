import { action, observable } from 'mobx'
import { createContext } from 'react'

class AsideStore {
  @observable public asideTitle = 'asideTitle'

  @action.bound public setAsideTitle(asideTitle: string) {
    this.asideTitle = asideTitle
  }
}

const AsideContext = createContext(new AsideStore())

export { AsideContext }
