import React, { useContext, useEffect, useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../App'
import toast from 'react-hot-toast'
import { Context } from '../index'

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const {isAuth,setIsAuth,loader,setLoader } = useContext(Context);
  const navigate = useNavigate();

  if(isAuth){
    navigate('/ ')
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
   
    try {
      await axios.post(`${server}/user/login`, {
        email,
        password
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

        setIsAuth(true);
        setemail('');
        setpassword('');
        setLoader(false);
        toast.success("Login Success")
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
      setLoader(false);
      setpassword('');
    }
  }

  useEffect(()=>{
    if(!navigator.onLine){
      navigate('/')
      // toast.error(navigator.onLine)
    }
  },[])
  return (
    <div className='login'>
      <form className="container" onSubmit={submitHandler}>
        <h1>Login</h1>
        <div>
          <input type="email" placeholder='Email'
            onInput={(e) => {
              setemail(e.target.value)
            }}
            value={email}
            required
          />
          <input type="password" placeholder='Password'
            onInput={(e) => {
              setpassword(e.target.value)
            }}
            value={password}
            required
          />
          <button type="submit" disabled={loader}>Submit</button>
          <Link to={"/register"} className='registerWithUs'>Register With Us</Link>
        </div>
      </form>
    </div>
  )
}

export default Login