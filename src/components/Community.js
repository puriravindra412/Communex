import React from 'react'
import { Addcommunity } from './Addcommunity'
import MobileSideBar from './MobileSideBar'
import NavBar from './navBar'
import SideBar from './SideBar'


export const Community = () => {
  return (
    <div>
    <NavBar />
    <div className='main-content'>
                        <SideBar />
                        <MobileSideBar />
                        <Addcommunity />
    </div>
  </div>
    
  )
}
