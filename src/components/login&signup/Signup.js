import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions/AuthAction.js";
export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (data.password === data.confirmpassword) {
      dispatch(signUp(data));
    }
  };
  const [confirmPass, setConfirmPass] = useState(true);
  return (
    <div className="login-right-box">
      <p className="login-text">Sign up</p>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="firstname"
          {...register("firstname")}
          required
        ></input>
        <input
          type="text"
          placeholder="lastname"
          {...register("lastname")}
        ></input>
        <input
          type="text"
          placeholder="username"
          {...register("username")}
        ></input>
        <input type="text" placeholder="email" {...register("email")}></input>
        <input
          type="text"
          placeholder="password"
          {...register("password")}
        ></input>
        <input
          type="text"
          placeholder="Confirmpassword"
          {...register("confirmpassword")}
        ></input>

        <button type="submit">Sign up</button>
      </form>
      <hr className="horizontal-line"></hr>
      <p className="or-text">OR</p>
    </div>
  );
};
