import {React, useEffect} from 'react'
import logo from '../images/logo.png'
import mobileLogo from '../images/logo1.png'
import { CiSearch ,CiDark,} from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline,IoChatbubblesOutline ,IoMenuOutline} from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../redux/actions/theme';
const NavBar = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  const switchMode=()=>{
    dispatch(updateTheme(theme.theme=== 'lightmode' ? 'darkmode' : 'lightmode'));
  }

  useEffect(()=> {
    console.log(theme.theme);
    document.body.className=theme.theme;
},[theme]);
  return (
    <div className='nav-container'>
    
    <img src={logo} alt="logo" className='logo'></img>
    <img src={mobileLogo} alt="logo" className='logo1'></img>
    <div className='search-box'>
            <input className='nav-input'></input>
            <button className='search' > <CiSearch  /></button> 
    </div>
    <div  className="icon-wrapper">
    <button className='icon-menu' onClick={()=>switchMode()}><CiDark  /></button>
    <button className='icon-menu'><IoNotificationsOutline  /></button>
    <button className='icon-menu'><IoChatbubblesOutline   /></button>
    <button className='icon-menu'><CgProfile  /></button>
    
    </div>
    <div className='small-menu'>
    <IoMenuOutline />
    </div>
    </div>
    
  )
};

export default NavBar;
