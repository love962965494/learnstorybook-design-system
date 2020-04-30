import React from 'react'
import { addDecorator } from '@storybook/react'
// import { GlobalStyle } from '../src/shared/global'
// import '../src/shared/global.css'
import { withA11Y } from '@storybook/addon-a11y'

function GlobalStyle() {
  return (
    <style>
      {/* {`body { padding: 15px; }`} */}
    </style>
  )
}

addDecorator(withA11Y)
addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
))
