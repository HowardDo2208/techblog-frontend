import React from 'react'
import Footer from '../Footer/Footer'
import MainNavigation from '../MainNavigation/MainNavigation'

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      {props.children}
      {/* <Footer /> */}
    </>
  )
}

export default Layout
