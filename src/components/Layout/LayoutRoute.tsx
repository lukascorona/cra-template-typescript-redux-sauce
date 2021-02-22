import React from 'react'
import { Route } from 'react-router-dom'

const LayoutRoute = ({ component: Component, layout: Layout, title, ...rest } : any) => (
  <Route
    {...rest}
    render={(props : any) => (
      <Layout title={ title }>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default LayoutRoute;