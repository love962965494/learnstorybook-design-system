import React from 'react'
import Layout from './Layout'
import LayoutModel from './mock'
import { StaticRouter } from 'react-router-dom'

export const StandardLayout = () => (
  <StaticRouter>
    <Layout title="Neco" model={LayoutModel} />
  </StaticRouter>
)
