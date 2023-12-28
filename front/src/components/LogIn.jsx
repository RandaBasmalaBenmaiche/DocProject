import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';

export default function LogIN() {
  const { register, handleSubmit } = useForm();
  const location = useHistory()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const {isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth )
  useEffect(()=>{
    if(isError){
        alert(message)
    }
    if(isSuccess || user){
      if(user.isAdmin){
        location.push('/admin')
      }
      if(user.gold === "gold"){
        location.push('/gold')
      }else if (user.gold === "normal"){
        location.push('/simple')
    }
  }

    dispatch(reset())
  },[user, isError, isSuccess, message, location, dispatch])
  const onSubmit = data => dispatch(login(data))

  if(isLoading){
    return <p>loading ...</p>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input {...register("firstName")}type='text' placeholder='first name' required/>
      <input {...register("lastName")}type='text' placeholder='last name' required/> */}
      <input {...register("email")}type='email' placeholder='email' required/>
      {/* <input {...register("annee")}type='number' placeholder='annee' required/> */}
      <input {...register("password")}type='password' placeholder='password' required/>
      <input type="submit" />
    </form>
  );
}