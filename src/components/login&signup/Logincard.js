import {React} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions/AuthAction.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Logincard = () => {

    const dispatch=useDispatch();
    const {register, handleSubmit }=useForm();
    const navigate=useNavigate();
    const onSubmit=async(data) => {
        dispatch(logIn(data,navigate));
       
       
    };
    
  return (
    <div>
                   
                    <p className='login-text'>login</p>
                    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                        <input type='text' placeholder=' Email or Phone or Username' name='username' {...register('username')} required></input>
                        <input type='text' placeholder="Password" name='password' {...register('password')} required></input>
                        <button type='submit'>submit</button>
                        
                    </form>
                    <hr className='horizontal-line'></hr>
                    <p className='or-text'>OR</p>
                    <button className='forget-password-button'>Forget Password ?</button>
                    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>  
  )
}
