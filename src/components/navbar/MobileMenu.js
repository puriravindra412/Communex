import React from 'react';
import { CgProfile } from "react-icons/cg";
import { CiSaveDown1,CiLogout,CiSettings } from "react-icons/ci";
import '../../css/mobileMenu.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/actions/AuthAction.js';
export const MobileMenu = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch=useDispatch();
  const logoutSession=()=>{
    
    dispatch(logout());
  }
  return (
    <div>
    {user ? <ul className='hambergur-menu'>
             
            <li> <Link to={`/profile/${user._id}`}> <CgProfile  className='icon'/>My Profile</Link></li>
            <li><CiSaveDown1 className='icon'/>Saved Posts</li>
            <li><CiSettings className='icon' />Setting</li>
            <li onClick={logoutSession} ><CiLogout className='icon' />Log out</li>
         
            <li></li>
        </ul>:
        <ul className='hambergur-menu'>
             
            <li> <Link to='/login'> <CgProfile  className='icon'/>login</Link></li>
           
         
            <li></li>
        </ul>
      }

      
    </div>
  )
}

