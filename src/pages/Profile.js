import React, { useContext, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../App'
import toast from 'react-hot-toast'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [userDetail,setuserDetail] = useState({});
  const {isAuth,loader,setLoader } = useContext(Context);
  const navigate = useNavigate();
  
  const getDetails = async()=>{
    try {
      setLoader(true)
      const {data} = await axios.get(`${server}/user/me`,{
        withCredentials:true
      })
      setuserDetail(data?data.user:{})
    } catch (error) {
      toast.error(error?.response?.data?.message)
      if(!isAuth){
        navigate('/login')
      }
    }
    setLoader(false)
  }
  useLayoutEffect(()=>{
    
    getDetails();
  },[])

  return (
    <div className='Profile'>
      <h1>{userDetail?.name}</h1>
      <h3>{userDetail?.email}</h3>
      <h5>{userDetail?.createdAt}</h5>
    </div>
  )
}

export default Profile