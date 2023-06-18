import React from 'react'
import { BsRobot} from "react-icons/bs";
import { BiHomeAlt2} from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { CgCommunity } from "react-icons/cg";
import { TiGroupOutline} from "react-icons/ti";
import { IoIosMore} from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdOutlineTravelExplore } from 'react-icons/md';
export default function SideBar() {
    
  return (
    <div className='sidebar-div'>
    <div className='side-bar'>
    
        <ul>
            <li><Link to='/' className='link-styling'><BiHomeAlt2 className='list-icon' /> <span>Home</span> </Link> </li>
            <li><Link to='/explore' className='link-styling'> <MdOutlineTravelExplore className='list-icon' /> <span>Explore</span> </Link> </li>
            <li> <Link to='/community' className='link-styling'> <CgCommunity   className='list-icon' /> <span>Community</span> </Link></li>
            <li><Link to='/CommuVerse' className='link-styling'> <BsRobot className='list-icon' /><span>CommuVerse</span> </Link> </li>
            <li> <TiGroupOutline className='list-icon' /> <span>Jobs</span> </li>
            <li> <HiOutlineClipboardList className='list-icon' /><span>Internship</span>  </li>
            <li> <Link to='/about' className='link-styling'> <CgCommunity   className='list-icon' /> <span>About</span> </Link></li>
            

            

        </ul>
        
  </div>
  </div> 
  );
  
  
}