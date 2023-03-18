import React from 'react'
import { IoSend} from "react-icons/io5";
import profile from "../images/profile.jpg"
import images from '../images/post.jpeg'
import { HiOutlinePhotograph,HiOutlineVideoCamera } from "react-icons/hi";
import FeedCard from './feedCard';
import { MdAutorenew } from "react-icons/md";
import { FaHotjar } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
export default function Feed(props){


const data =[{ profilePicture:profile,
              userName:'puriravindra',
              heading:'Most Famous Liberary  in react',
              image:images,
            tags:'#react #frontend #react-liberary #mui #redux #react #frontend #react-liberary #mui #redux'
            },{ profilePicture:profile,
              userName:'manishgoswami0',
              heading:'top 15 best javascript liberary',
              image:'https://media.licdn.com/dms/image/C4D12AQGE_QDhRlMqxw/article-cover_image-shrink_423_752/0/1634192303205?e=1684368000&v=beta&t=OmX3dmrCasDfsIDYN8bq3gjh7EPwaBvNxUvNw6DelyU',
            tags:'#javascript #html #programming #css #coding #java #python #developer #programmer #webdeveloper #webdevelopment #code #coder #php #webdesign #software #softwaredeveloper #computerscience #codinglife #reactjs #technology #frontend #development #programmers #js #web #softwareengineer #programmingmemes #linux #javascriptdeveloper'
            },{ profilePicture:profile,
              userName:'nitesh_goswami123',
              heading:'learn type script faster',
              image:'https://cdn.hashnode.com/res/hashnode/image/upload/v1678830803489/804e005a-9e30-4290-9501-eeab42cf0ff5.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
            tags:'#javascript #html #programming #css #coding #java #python #developer #programmer #webdeveloper #webdevelopment #code #coder #php #webdesign #software #softwaredeveloper #computerscience #codinglife #reactjs #technology #frontend #development #programmers #js #web #softwareengineer #programmingmemes #linux #javascriptdeveloper'
            }];
  return (
    <div className="container">
    
    <div className='feed-upload-container' style={{display:props.displayUpload}}>
    <img src={profile} alt="profile" className="profile-image"></img>
    <input className='post-input' placeholder='Wanna post something.....'></input>
    <button className='upload-button'><IoSend /></button>
    <button className='upload-photo'><HiOutlinePhotograph  /> Upload Photo</button>
    <button className='upload-video'><HiOutlineVideoCamera /> Upload Video</button>
    </div>
    <div className='card-container'>
    <div className='container-top'>
    <button  className='container-top-button'><MdAutorenew /> New</button>
    <button className='container-top-button'><FaHotjar /> hot</button>
    <button className='container-top-button'><HiViewGrid /> view</button>
    </div>
        {data.map((item)=>{
          return(
             <FeedCard profilePicture={item.profilePicture}
             userName={item.userName}
             heading={item.heading}
             image={item.image}
           tags={item.tags}
           key={item.userName}></FeedCard>
          )
         
      })}
      </div>
      </div>
        
       

    
  )
}
