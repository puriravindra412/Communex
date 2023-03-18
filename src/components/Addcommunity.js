import React from 'react'
import { IoPencil } from "react-icons/io5";
import { TrendingTags } from './TrendingTags'
const data=[{img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png?20120221235433',name:'Javascript',peoples:420},
            {img:'https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png',name:'React',peoples:330},
            {img:'https://www.pikpng.com/pngl/m/21-210393_our-portfolio-includes-over-100-web-development-projects.png',name:'Web-development',peoples:280},
            {img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png',name:'Python',peoples:250},
            {img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png?20120221235433',name:'Javascript',peoples:420},
            {img:'https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png',name:'React',peoples:330},
            {img:'https://www.pikpng.com/pngl/m/21-210393_our-portfolio-includes-over-100-web-development-projects.png',name:'Web-development',peoples:280},
            {img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png',name:'Python',peoples:250}
        ]

export const Addcommunity = () => {

  return (
    <div>
    <div className='community'>
    <div className='add-commuinty'>
    <h4>Create New Community</h4>
    <button className='community-buuton-icon' >Add New Community <IoPencil  /></button>
    <h6 style={{textAlign:'center',display:'block'}}>or Explore more</h6>
    <div className='trending-tags-grid'>
    {data.map((index)=>{return <TrendingTags img={index.img} name={index.name} peoples={index.peoples} key={index.name}></TrendingTags>})}
    </div>
    </div>
    </div>
    </div>
  )
}
