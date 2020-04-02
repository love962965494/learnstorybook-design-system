import { action, observable } from 'mobx'
import { createContext } from 'react'

class ButtonStore {
  @observable public buttonTitle = 'ButtonTitle'

  @action.bound public setButtonTitle(buttonTitle: string) {
    this.buttonTitle = buttonTitle
  }
}

const ButtonContext = createContext(new ButtonStore())

export { ButtonContext }
