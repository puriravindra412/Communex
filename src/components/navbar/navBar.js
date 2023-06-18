import {React, useEffect,useState} from 'react'

import logo from '../../images/logo.png'
import mobileLogo from '../../images/logo1.png'
import { CiSearch ,CiDark,CiLight} from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline,IoChatbubblesOutline ,IoMenuOutline,IoCloseSharp} from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../../redux/actions/theme';
import { IconName, RiMessengerLine } from "react-icons/ri";
import { MobileMenu } from './MobileMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const NavBar = () => {
  const nevigate=useNavigate();
  const dispatch = useDispatch();
 
  const theme = useSelector(state => state.theme);
const{register,handleSubmit}=useForm();

  const switchMode=()=>{
    dispatch(updateTheme(theme.theme=== 'lightmode' ? 'darkmode' : 'lightmode'));
  }

  useEffect(()=> {
    console.log(theme.theme);
    document.body.className=theme.theme;
},[theme]);
const[isOpen,setOpen]=useState(true);
const[style,setStyle]=useState("mobileSlider");
const showMenu=()=>{
  setOpen(!isOpen)
  if(isOpen){
    
    console.log(style);
  
  setStyle("mobileSlider2")}
  else{
    console.log(style);
    setStyle("mobileSlider");
  }

  
}

const submit=(data)=>{
 nevigate('/search',{state:{"search":data.search}})
  
}

  return (
   
    
    <div className='nav-container'>
    
    <Link to='/'><img src={logo} alt="logo" className='logo'></img></Link>
    <Link to='/'><img src={mobileLogo} alt="logo" className='logo1'></img></Link>
    <form className='search-box' onSubmit={handleSubmit(submit)}>
            <input className='nav-input' name='search' {...register('search')}></input>
            <button className='search' > <CiSearch  /></button> 
    </form>
    
    <div  className="icon-wrapper">
    <button className='icon-menu' onClick={()=>switchMode()}>{theme.theme=== 'lightmode'?<CiDark  />:<CiLight />}</button>
    <button className='icon-menu'><IoNotificationsOutline  /></button>
    <Link to='/chat'><button className='icon-menu'><RiMessengerLine   /></button></Link>
    <button className='icon-menu' onClick={()=>showMenu()}><CgProfile  /></button>
    <div  className={style}> <MobileMenu/></div>
    
    </div>
    <button className='icon-menu-small' onClick={()=>switchMode()}>{theme.theme=== 'lightmode'?<CiDark  />:<CiLight />}</button>
    <Link to='/chat-mobile'><button  className='icon-menu-small'><RiMessengerLine  /></button></Link>
    <div className='small-menu'>
    
    <button className='small-menu-button' onClick={()=>showMenu()}> {isOpen?<IoMenuOutline />:<IoCloseSharp />}</button>
    <div  className={style}> <MobileMenu/></div>
  </div>
  
  
    </div>
    
    
  )
};

export default NavBar;
