import React from 'react'
import Nav from './Nav'
import SideBar from './SideBar'
import Footer from './Footer'

import { Outlet } from 'react-router-dom'


export default function Master() {
  return (
    <>
      <Nav/>
      <div id="layoutSidenav">
        <SideBar/>

        <div id="layoutSidenav_content">
            <main>
                
                <Outlet/>
                
            </main>
            <Footer/>
        </div>
      </div>
    </>
  )
}
