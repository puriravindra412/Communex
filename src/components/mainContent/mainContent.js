import React from 'react'

import Feed from '../home/Feed'
import { IoPencil } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {  useSelector } from "react-redux";
export default function MainContent() {
  const user  = useSelector((state) => state.authReducer.authData);
  const id=user._id;
  return (
    <div className="container">
    
    <button className='community-buuton-icon' ><Link to="/createPost"> lets post something new  <IoPencil  /></Link></button>
    <Feed id={id}/>
    </div>
    
  )
}
