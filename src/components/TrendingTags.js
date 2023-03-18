import React from 'react'
import { BsPersonPlusFill} from "react-icons/bs";
export const TrendingTags = ({img,name,peoples}) => {
  return (
    <div className='trending-tag-box-design'>
    <img src={img} alt={img}/>
    <div>
    <h5>{name}</h5>
    <p>{peoples} post recently</p>
    </div>
    <button className='trending-tag-box-design-button' ><BsPersonPlusFill /></button>

    </div>
  )
}
