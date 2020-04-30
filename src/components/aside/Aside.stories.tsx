import React from 'react'
import Aside from './Aside'
import AsideModel from './mock'
import { StaticRouter } from 'react-router-dom'

export const StandardAside = () => (
  <StaticRouter>
    <Aside title="Neco" model={AsideModel} />
  </StaticRouter>
)
