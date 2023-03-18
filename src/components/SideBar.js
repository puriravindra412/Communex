import React from 'react'
import { BiHomeAlt2} from "react-icons/bi";
import { HiHashtag,HiOutlineClipboardList } from "react-icons/hi";
import { CgCommunity } from "react-icons/cg";
import { TiGroupOutline} from "react-icons/ti";
import { IoIosMore} from "react-icons/io";
import { Link } from 'react-router-dom';
export default function SideBar() {
    
  return (
    <div>
    <div className='side-bar'>
    
        <ul>
            <li><Link to='/' className='link-styling'><BiHomeAlt2 className='list-icon' /> Home </Link> </li>
            <li><Link to='/explore' className='link-styling'> <HiHashtag className='list-icon' /> Explore </Link> </li>
            <li> <Link to='/community' className='link-styling'> <CgCommunity   className='list-icon' /> Community </Link></li>
            <li> <TiGroupOutline className='list-icon' /> jobs </li>
            <li> <HiOutlineClipboardList className='list-icon' /> Internship </li>
            <li > <button className='more'><IoIosMore className='list-icon' /> more </button> </li>

            

        </ul>
        
  </div>
  </div> 
  );
  
  
}