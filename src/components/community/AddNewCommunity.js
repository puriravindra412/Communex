import React, { useRef, useState } from 'react'
import NavBar from '../navbar/navBar';
import '../../css/create-new-coomunity.css'
import { useForm } from 'react-hook-form';
import { uploadImage} from "../../redux/actions/UploadAction";
import {useDispatch, useSelector } from 'react-redux';
import * as CommunityApi from'../../api/CommunityRequests.js'
const AddNewCommunity = () => {
  const {register, handleSubmit }=useForm();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const user=useSelector((state) => state.authReducer.authData);
  const onImageChange = (event) => {
      
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      
    }
  };
  const submit=(data)=>{
    const newCommunity={
      name:data.name,
      userId:user._id,
      
    }

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newCommunity.image = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    create(newCommunity);
    

  }

  const create=async(formData)=>{
    const {data}=await CommunityApi.createCommunity(formData);
   alert(data)
    
  }
  return (
    <div>
    <NavBar />
    <div className='create-new-community-container'>
    <h3>Create New Community</h3>
    <form className='create-community-form' onSubmit={handleSubmit(submit)}>
    <input placeholder="Community name"  {...register('name') }></input>
    <div className='upload-community-image'>
    <button onClick={() => imageRef.current.click()} type="button">Upload icon Image</button>
         {image && <img src={URL.createObjectURL(image)} alt="preview" />}
    </div>
    <div style={{ display: "none" }}>
    <input type="file" ref={imageRef} onChange={onImageChange} />
    </div>
    <button type='submit'>submit</button>

   
     
    </form>
    </div>

    </div>
  )
}
export  default AddNewCommunity;