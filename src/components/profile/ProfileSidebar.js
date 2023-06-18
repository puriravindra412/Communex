import React from 'react'
import banner from '../../images/banner.png'
import profile from '../../images/profile.jpg'
import { IoPencil,IoLogoGithub,IoLogoLinkedin} from "react-icons/io5";
import { IoIosLink } from "react-icons/io";

export const ProfileSidebar = (data) => {
    const userProfile=data.data;
    console.log(userProfile);
  return (
    <div class="edit-profile-bio">
    <div className='profile-card'>
    <div className='profile-box'>
    <img src={process.env.REACT_APP_PUBLIC_FOLDER +userProfile.profilePicture} alt='banner' className='profile-img-box' ></img>
    </div>
    <img src={process.env.REACT_APP_PUBLIC_FOLDER +userProfile.coverPicture} alt='banner' className='banner'></img>
    <div className='profile-bio-Section'>
    <h6>{userProfile.username}</h6>
    <p>{userProfile.firstname+" "+userProfile.lastname}</p>
    <p className='profile-bio'>{userProfile.bio}</p>
    <p><strong>Works At : </strong>{userProfile.worksAt}</p>
    <p><strong>Community : </strong>{userProfile.community.map((item)=>{ return <span>{" "+item+" "}</span>;})}</p>
    <div className='follower-following-box'>
        <div className='follower-following-item'>
            <h6>follower</h6>
            <p>{userProfile.followers.length}</p>
        </div>
        <div className='follower-following-item'>
            <h6>following</h6>
            <p>{userProfile.following.length}</p>
        </div>
   </div>
   <p><IoLogoGithub /><a href="https://github.com/puriravindra412" > {userProfile.github} </a></p>
   <p><IoLogoLinkedin /><a href="https://github.com/puriravindra412" > {userProfile.linkedin} </a></p>
   <p><strong> <IoIosLink /> </strong><a href="https://www.google.com" > {userProfile.website} </a></p>

    </div>
    </div>
    </div>
  )
}
