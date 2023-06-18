import React, { useEffect } from 'react'
import { BsPersonPlusFill} from "react-icons/bs";
import { useSelector } from 'react-redux';
import * as CommunityApi from '../../api/CommunityRequests.js'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
export const TrendingTags = ({img,name,peoples,posts}) => {
  const user=useSelector((state) => state.authReducer.authData);

  const addUser=()=>{
    const data={
      name:name,
      userId:user._id,
      username:user.username,
      profile:user.profilePicture,
      bio:user.bio,
      worksAt:user.worksAt
    }
    addCommunity(data)
    
  }

  const addCommunity=async(data)=>{
    const res=await CommunityApi.addUserToCommunity(data);
   
   if(res.data==='user added'){
   
      toast.success("You have joined A Community Sucessfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    
   }else{
    toast.error("you have Already Joined this Community", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  

   }
  }
  
  return (
    <div className='trending-tag-box-design' >
    <img src={process.env.REACT_APP_PUBLIC_FOLDER+img} alt={img}/>
    <div>
    <Link to={`/community/${name}` } state={[img,peoples,posts]}> <h5>{name}</h5></Link>
    <p>{peoples.length} people joined</p>
    </div>
    <button className='trending-tag-box-design-button' onClick={addUser} ><BsPersonPlusFill /></button>

    </div>
  )
}
