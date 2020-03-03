import React from 'react'
import { addDecorator } from '@storybook/react'
import { GlobalStyle } from '../src/shared/global'
import { withA11Y } from '@storybook/addon-a11y'

addDecorator(withA11Y)
addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
))
