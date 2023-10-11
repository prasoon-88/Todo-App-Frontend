import React, { useContext } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { server , navigate } from '../App';
import axios from 'axios';
import { Context } from '../index';



const Register = () => {
  const {isAuth,setIsAuth,loader,setLoader } = useContext(Context);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  if(isAuth){
    navigate('/ ')
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const { data } = await axios.post(`${server}/user/register`, {
        name,
        email,
        password
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

      setemail('');
      setname('');
      setpassword('');
      toast.success(data.message)
      setLoader(false);
      setIsAuth(true);

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoader(false);
      setIsAuth(false);
    }
    navigate('/login')
  }
  return (
    <div className='login'>
    <form className="container" onSubmit={submitHandler}>
      <h1>Register</h1>
      <div>
        <input type="text" placeholder='Name'
        onInput={(e) => {
          setname(e.target.value)
        }}
        value={name}
        required
        />  
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
        <button type="submit" disabled={loader}>Sign Up</button>
        <Link to={"/login"} className='registerWithUs'>Login To TodoApp</Link>
      </div>
    </form>      
</div>
  )
}

export default Register