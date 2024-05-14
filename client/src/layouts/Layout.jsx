import React from 'react'
import LoggedOutLayout from './LoggedOutLayout'

const Layout = ({children}) => {
  return (
    <LoggedOutLayout>
        {children}
    </LoggedOutLayout>
  )
}

export default Layout
