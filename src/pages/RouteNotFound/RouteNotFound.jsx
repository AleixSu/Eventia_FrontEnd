import { Helmet } from 'react-helmet-async'
import './RouteNotFound.css'
import React from 'react'

const RouteNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | EventHub</title>
        <meta name='robots' content='noindex, follow' />
      </Helmet>
      <div>
        <h1>Route Not Found</h1>
      </div>
    </>
  )
}

export default RouteNotFound
