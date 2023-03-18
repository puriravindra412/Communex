import React from 'react'
import MainContent from './mainContent';

import MobileSideBar from './MobileSideBar';
import NavBar from './navBar';
import { RightsideBar } from './RightsideBar';
import SideBar from './SideBar';
export default function Home() {
  return (
    <div>
      <NavBar />
      <div className='main-content'>
        <SideBar />
        <MobileSideBar />
        <MainContent />
        <RightsideBar />
      </div>
    </div>
  )
}
