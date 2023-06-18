import React from 'react'
import { BiHomeAlt2} from "react-icons/bi";
import { HiHashtag,HiOutlineClipboardList } from "react-icons/hi";
import { CgCommunity } from "react-icons/cg";
import { TiGroupOutline} from "react-icons/ti";
import { IoIosMore} from "react-icons/io";
import { Link } from 'react-router-dom';
export default function MobileSideBar() {
  return (
    
    <div className='mobile-sidebar'>
    <ul>
            <li> <Link to='/'> <BiHomeAlt2 className='list-icon' /> </Link> </li>
            <li><Link to='/explore'> <HiHashtag className='list-icon' /></Link>  </li>
            <li><Link to='/community'> <CgCommunity className='list-icon' /></Link>  </li>
            <li> <TiGroupOutline className='list-icon' /> </li>
            <li> <HiOutlineClipboardList className='list-icon' />  </li>
            <li > <button ><IoIosMore className='list-icon' /> </button> </li>

            

        </ul>
    </div>
    
  )
}
