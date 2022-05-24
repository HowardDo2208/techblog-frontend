import React from 'react'
import Footer from '../Footer/Footer'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import MainNavigation from '../MainNavigation/MainNavigation'

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <div className="container-layout">
        <div className="container-sidebar">
          <LeftSideBar />
        </div>
        {props.children}
        {/* <RightSideBar tags={tags} isLoading={isLoading} /> */}
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
