import React from 'react'
import MainContent from '../mainContent/mainContent';

import MobileSideBar from '../sideBar/MobileSideBar';
import NavBar from '../navbar/navBar';
import { RightsideBar } from '../rightSideBar/RightsideBar';

import SideBar from '../sideBar/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <div className='app'>
      <NavBar />
      <div className='main-content'>
        <SideBar />
        <MobileSideBar />
        <MainContent />
        <RightsideBar />
        
      </div>
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
}
