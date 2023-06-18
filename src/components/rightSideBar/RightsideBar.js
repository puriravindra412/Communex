import React ,{ useEffect, useState } from 'react'
import { TrendingTags } from './TrendingTags'
import * as CommunityApi from '../../api/CommunityRequests.js'
export const RightsideBar = () => {
  const[Community,setCommunity]=useState([]);

  useEffect(()=>{
    const communities=async()=>{ 
      const communitData=await CommunityApi.getCommunity();
      setCommunity(communitData.data);
    
    }
    communities();
  },[])
  return (
    <div className='right-sidebar'>
        <div>
            <h2>Treanding tags </h2>
            {Community.map((index)=>{return <TrendingTags img={index.image} name={index.name} peoples={index.users} key={index.name}></TrendingTags>})}
        </div>
    </div>
  )
}
