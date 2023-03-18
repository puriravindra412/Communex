import React from 'react'
import { ExploreFeed } from './ExploreFeed'

import MobileSideBar from './MobileSideBar'
import NavBar from './navBar'
import SideBar from './SideBar'

export default function Explore() {
  return (
    <div>
    <NavBar />
    <div className='main-content'>
    <SideBar />
    <MobileSideBar />
    <ExploreFeed />
    {/*<MainContent />*/}
  </div>
    </div>
  )
}
